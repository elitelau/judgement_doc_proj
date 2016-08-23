namespace js grouping_shared
namespace cpp grouping_shared  

/*
 *  TODO list:
 *  (1) 考虑受伤人数 >= 255, 改为int16
 */

/*
 * 从轻从重的量刑情节: 128位数用于表示所有的量刑情节
 * 所有从轻的情况，从重的情况
 */
struct PunishmentScenarios {
   1: required i64 first;     /* first part of 128 bit integer */
   2: required i64 second;
}

enum InjuryLevel {
    SLIGHT = 1,
    SERIOUS = 2,
    DEATH = 3,
    UNKN = 100
}

/*
 *  伤害情况：比如轻伤两级，重伤二级
 */
struct Injury {
   1: required InjuryLevel  level;
   2: required byte         degree;
   3: required i16          number;           // xxx伤害程度人数
}

/*
 * basis => bases
 */
struct JudgeBases {
   1: required PunishmentScenarios  scenarios;
   2: optional double               amount;                 /* 涉案金额 */
   3: optional list<Injury>         injury_scenarios;       /* 伤害情节,针对比如故意伤害罪 */
}

struct JudgeGroup {
   1:  required JudgeBases  bases;    // 判断依据: 从轻从重情节 + 涉案金额 + 具体罪行相关的情节 
   2:  required i32         doc_count;
   3:  required string         data1;    // <data1, data2>为量刑情节的压缩
   4:  required string         data2;
}

struct ScenariosGroup {
   1: required list<string> scenarios;
   2: required i32          doc_count;
   3:  required string         data1;    // <data1, data2>为量刑情节的压缩
   4:  required string         data2;
}

struct rpc_call_group_scenarios_struct {
   1: required list<ScenariosGroup> page_data;
   2: required i32                  total_pages;
}

struct rpc_call_doc_group_struct {
   1: required list<doc_info>   page_data;
   2: required i32              total_pages;
}

enum Penalty {
   P_LIMIT = 0,        # 有期徒刑
   P_DETENTION = 1,    # 拘役
   P_CTRL = 2,         # 管制
   P_LIFE = 3,         # 无期徒刑
   P_DEATH = 4,        # 死刑
   P_FREE = 5          # 免于刑事处罚
}

struct Sentence {
   2: required string   accused;
   3: required Penalty  penalty;
   4: required i32      duration;
   5: optional double   probation;   // 有时精确到几天
   6: optional double   fine;
}

typedef string Timestamp;

struct doc_info {
   1: required i32              docid;
   2: required list<Sentence>   sentences;
   /*
    *   31   [30-29]    [28-25]   [24-22]   [21-16]   [15-11]    [10-5]    [4-1]
    *   |      |           |         |         
    * UNKN?  死亡人数  重伤I人数 重伤II人数 轻伤I人数 轻伤II人数 轻伤人数 重伤人数
    *
    *  注: 轻伤人数，代表未区分出轻伤几级。31位为1，表示未获取到伤重死情况
    */
   3: optional i32              injury;     // unsigned 
   4: optional double           amount;
   5: optional string           title;      // 文档标题
   6: required string           name;       // 法院的文档编号 (2014)金婺刑初字第73号
   7: required Timestamp        date; 
   8: required string           court_name;
   9: required byte             kind;
   10: required string          full_text;
}

exception QueryFailure {
   1: required byte     code;   // 1: fail to connect mysql   2: fail to connect redis
   2: required string   desc;   
}

service ClusterJudge {
   rpc_call_group_scenarios_struct group_scenarios(1: string crime, 2: i32 page_no, 3: i32 page_size) 
        throws (1: QueryFailure ouch);

   // get docs of senarios group in detail
   rpc_call_doc_group_struct get_docs_of_sgroup(1: string crime, 2: string  data1, 3: string data2, 4: i32 page_no, 5: i32 page_size)
        throws (1: QueryFailure ouch);


   list<Sentence> get_scenarios_group_sentences(1: string crime, 2: i32 group_id, 
        3: i32 page_no, 4: i32 page_size) throws (1: QueryFailure ouch); 

   
   // 注: 涉案金额会有差别, 伤残等级也会有细微差别
   list<JudgeBases> get_judge_bases(1: list<i32> docid_array) throws (1: QueryFailure ouch);    
   list<JudgeGroup> group_judge(1: string crime) throws (1: QueryFailure ouch);
}
