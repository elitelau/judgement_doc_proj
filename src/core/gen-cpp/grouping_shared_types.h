/**
 * Autogenerated by Thrift Compiler (0.9.3)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
#ifndef grouping_shared_TYPES_H
#define grouping_shared_TYPES_H

#include <iosfwd>

#include <thrift/Thrift.h>
#include <thrift/TApplicationException.h>
#include <thrift/protocol/TProtocol.h>
#include <thrift/transport/TTransport.h>

#include <thrift/cxxfunctional.h>


namespace grouping_shared {

struct InjuryLevel {
  enum type {
    SLIGHT = 1,
    SERIOUS = 2,
    DEATH = 3,
    UNKN = 100
  };
};

extern const std::map<int, const char*> _InjuryLevel_VALUES_TO_NAMES;

struct Penalty {
  enum type {
    P_LIMIT = 0,
    P_DETENTION = 1,
    P_CTRL = 2,
    P_LIFE = 3,
    P_DEATH = 4,
    P_FREE = 5
  };
};

extern const std::map<int, const char*> _Penalty_VALUES_TO_NAMES;

typedef std::string Timestamp;

class PunishmentScenarios;

class Injury;

class JudgeBases;

class JudgeGroup;

class ScenariosGroup;

class rpc_call_group_scenarios_struct;

class rpc_call_doc_group_struct;

class Sentence;

class doc_info;

class QueryFailure;


class PunishmentScenarios {
 public:

  PunishmentScenarios(const PunishmentScenarios&);
  PunishmentScenarios& operator=(const PunishmentScenarios&);
  PunishmentScenarios() : first(0), second(0) {
  }

  virtual ~PunishmentScenarios() throw();
  int64_t first;
  int64_t second;

  void __set_first(const int64_t val);

  void __set_second(const int64_t val);

  bool operator == (const PunishmentScenarios & rhs) const
  {
    if (!(first == rhs.first))
      return false;
    if (!(second == rhs.second))
      return false;
    return true;
  }
  bool operator != (const PunishmentScenarios &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const PunishmentScenarios & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(PunishmentScenarios &a, PunishmentScenarios &b);

inline std::ostream& operator<<(std::ostream& out, const PunishmentScenarios& obj)
{
  obj.printTo(out);
  return out;
}


class Injury {
 public:

  Injury(const Injury&);
  Injury& operator=(const Injury&);
  Injury() : level((InjuryLevel::type)0), degree(0), number(0) {
  }

  virtual ~Injury() throw();
  InjuryLevel::type level;
  int8_t degree;
  int16_t number;

  void __set_level(const InjuryLevel::type val);

  void __set_degree(const int8_t val);

  void __set_number(const int16_t val);

  bool operator == (const Injury & rhs) const
  {
    if (!(level == rhs.level))
      return false;
    if (!(degree == rhs.degree))
      return false;
    if (!(number == rhs.number))
      return false;
    return true;
  }
  bool operator != (const Injury &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const Injury & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(Injury &a, Injury &b);

inline std::ostream& operator<<(std::ostream& out, const Injury& obj)
{
  obj.printTo(out);
  return out;
}

typedef struct _JudgeBases__isset {
  _JudgeBases__isset() : amount(false), injury_scenarios(false) {}
  bool amount :1;
  bool injury_scenarios :1;
} _JudgeBases__isset;

class JudgeBases {
 public:

  JudgeBases(const JudgeBases&);
  JudgeBases& operator=(const JudgeBases&);
  JudgeBases() : amount(0) {
  }

  virtual ~JudgeBases() throw();
  PunishmentScenarios scenarios;
  double amount;
  std::vector<Injury>  injury_scenarios;

  _JudgeBases__isset __isset;

  void __set_scenarios(const PunishmentScenarios& val);

  void __set_amount(const double val);

  void __set_injury_scenarios(const std::vector<Injury> & val);

  bool operator == (const JudgeBases & rhs) const
  {
    if (!(scenarios == rhs.scenarios))
      return false;
    if (__isset.amount != rhs.__isset.amount)
      return false;
    else if (__isset.amount && !(amount == rhs.amount))
      return false;
    if (__isset.injury_scenarios != rhs.__isset.injury_scenarios)
      return false;
    else if (__isset.injury_scenarios && !(injury_scenarios == rhs.injury_scenarios))
      return false;
    return true;
  }
  bool operator != (const JudgeBases &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const JudgeBases & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(JudgeBases &a, JudgeBases &b);

inline std::ostream& operator<<(std::ostream& out, const JudgeBases& obj)
{
  obj.printTo(out);
  return out;
}


class JudgeGroup {
 public:

  JudgeGroup(const JudgeGroup&);
  JudgeGroup& operator=(const JudgeGroup&);
  JudgeGroup() : doc_count(0), data1(), data2() {
  }

  virtual ~JudgeGroup() throw();
  JudgeBases bases;
  int32_t doc_count;
  std::string data1;
  std::string data2;

  void __set_bases(const JudgeBases& val);

  void __set_doc_count(const int32_t val);

  void __set_data1(const std::string& val);

  void __set_data2(const std::string& val);

  bool operator == (const JudgeGroup & rhs) const
  {
    if (!(bases == rhs.bases))
      return false;
    if (!(doc_count == rhs.doc_count))
      return false;
    if (!(data1 == rhs.data1))
      return false;
    if (!(data2 == rhs.data2))
      return false;
    return true;
  }
  bool operator != (const JudgeGroup &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const JudgeGroup & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(JudgeGroup &a, JudgeGroup &b);

inline std::ostream& operator<<(std::ostream& out, const JudgeGroup& obj)
{
  obj.printTo(out);
  return out;
}


class ScenariosGroup {
 public:

  ScenariosGroup(const ScenariosGroup&);
  ScenariosGroup& operator=(const ScenariosGroup&);
  ScenariosGroup() : doc_count(0), data1(), data2() {
  }

  virtual ~ScenariosGroup() throw();
  std::vector<std::string>  scenarios;
  int32_t doc_count;
  std::string data1;
  std::string data2;

  void __set_scenarios(const std::vector<std::string> & val);

  void __set_doc_count(const int32_t val);

  void __set_data1(const std::string& val);

  void __set_data2(const std::string& val);

  bool operator == (const ScenariosGroup & rhs) const
  {
    if (!(scenarios == rhs.scenarios))
      return false;
    if (!(doc_count == rhs.doc_count))
      return false;
    if (!(data1 == rhs.data1))
      return false;
    if (!(data2 == rhs.data2))
      return false;
    return true;
  }
  bool operator != (const ScenariosGroup &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const ScenariosGroup & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(ScenariosGroup &a, ScenariosGroup &b);

inline std::ostream& operator<<(std::ostream& out, const ScenariosGroup& obj)
{
  obj.printTo(out);
  return out;
}


class rpc_call_group_scenarios_struct {
 public:

  rpc_call_group_scenarios_struct(const rpc_call_group_scenarios_struct&);
  rpc_call_group_scenarios_struct& operator=(const rpc_call_group_scenarios_struct&);
  rpc_call_group_scenarios_struct() : total_pages(0) {
  }

  virtual ~rpc_call_group_scenarios_struct() throw();
  std::vector<ScenariosGroup>  page_data;
  int32_t total_pages;

  void __set_page_data(const std::vector<ScenariosGroup> & val);

  void __set_total_pages(const int32_t val);

  bool operator == (const rpc_call_group_scenarios_struct & rhs) const
  {
    if (!(page_data == rhs.page_data))
      return false;
    if (!(total_pages == rhs.total_pages))
      return false;
    return true;
  }
  bool operator != (const rpc_call_group_scenarios_struct &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const rpc_call_group_scenarios_struct & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(rpc_call_group_scenarios_struct &a, rpc_call_group_scenarios_struct &b);

inline std::ostream& operator<<(std::ostream& out, const rpc_call_group_scenarios_struct& obj)
{
  obj.printTo(out);
  return out;
}


class rpc_call_doc_group_struct {
 public:

  rpc_call_doc_group_struct(const rpc_call_doc_group_struct&);
  rpc_call_doc_group_struct& operator=(const rpc_call_doc_group_struct&);
  rpc_call_doc_group_struct() : total_pages(0) {
  }

  virtual ~rpc_call_doc_group_struct() throw();
  std::vector<doc_info>  page_data;
  int32_t total_pages;

  void __set_page_data(const std::vector<doc_info> & val);

  void __set_total_pages(const int32_t val);

  bool operator == (const rpc_call_doc_group_struct & rhs) const
  {
    if (!(page_data == rhs.page_data))
      return false;
    if (!(total_pages == rhs.total_pages))
      return false;
    return true;
  }
  bool operator != (const rpc_call_doc_group_struct &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const rpc_call_doc_group_struct & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(rpc_call_doc_group_struct &a, rpc_call_doc_group_struct &b);

inline std::ostream& operator<<(std::ostream& out, const rpc_call_doc_group_struct& obj)
{
  obj.printTo(out);
  return out;
}

typedef struct _Sentence__isset {
  _Sentence__isset() : probation(false), fine(false) {}
  bool probation :1;
  bool fine :1;
} _Sentence__isset;

class Sentence {
 public:

  Sentence(const Sentence&);
  Sentence& operator=(const Sentence&);
  Sentence() : accused(), penalty((Penalty::type)0), duration(0), probation(0), fine(0) {
  }

  virtual ~Sentence() throw();
  std::string accused;
  Penalty::type penalty;
  int32_t duration;
  double probation;
  double fine;

  _Sentence__isset __isset;

  void __set_accused(const std::string& val);

  void __set_penalty(const Penalty::type val);

  void __set_duration(const int32_t val);

  void __set_probation(const double val);

  void __set_fine(const double val);

  bool operator == (const Sentence & rhs) const
  {
    if (!(accused == rhs.accused))
      return false;
    if (!(penalty == rhs.penalty))
      return false;
    if (!(duration == rhs.duration))
      return false;
    if (__isset.probation != rhs.__isset.probation)
      return false;
    else if (__isset.probation && !(probation == rhs.probation))
      return false;
    if (__isset.fine != rhs.__isset.fine)
      return false;
    else if (__isset.fine && !(fine == rhs.fine))
      return false;
    return true;
  }
  bool operator != (const Sentence &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const Sentence & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(Sentence &a, Sentence &b);

inline std::ostream& operator<<(std::ostream& out, const Sentence& obj)
{
  obj.printTo(out);
  return out;
}

typedef struct _doc_info__isset {
  _doc_info__isset() : injury(false), amount(false), title(false) {}
  bool injury :1;
  bool amount :1;
  bool title :1;
} _doc_info__isset;

class doc_info {
 public:

  doc_info(const doc_info&);
  doc_info& operator=(const doc_info&);
  doc_info() : docid(0), injury(0), amount(0), title(), name(), date(), court_name(), kind(0), full_text() {
  }

  virtual ~doc_info() throw();
  int32_t docid;
  std::vector<Sentence>  sentences;
  int32_t injury;
  double amount;
  std::string title;
  std::string name;
  Timestamp date;
  std::string court_name;
  int8_t kind;
  std::string full_text;

  _doc_info__isset __isset;

  void __set_docid(const int32_t val);

  void __set_sentences(const std::vector<Sentence> & val);

  void __set_injury(const int32_t val);

  void __set_amount(const double val);

  void __set_title(const std::string& val);

  void __set_name(const std::string& val);

  void __set_date(const Timestamp& val);

  void __set_court_name(const std::string& val);

  void __set_kind(const int8_t val);

  void __set_full_text(const std::string& val);

  bool operator == (const doc_info & rhs) const
  {
    if (!(docid == rhs.docid))
      return false;
    if (!(sentences == rhs.sentences))
      return false;
    if (__isset.injury != rhs.__isset.injury)
      return false;
    else if (__isset.injury && !(injury == rhs.injury))
      return false;
    if (__isset.amount != rhs.__isset.amount)
      return false;
    else if (__isset.amount && !(amount == rhs.amount))
      return false;
    if (__isset.title != rhs.__isset.title)
      return false;
    else if (__isset.title && !(title == rhs.title))
      return false;
    if (!(name == rhs.name))
      return false;
    if (!(date == rhs.date))
      return false;
    if (!(court_name == rhs.court_name))
      return false;
    if (!(kind == rhs.kind))
      return false;
    if (!(full_text == rhs.full_text))
      return false;
    return true;
  }
  bool operator != (const doc_info &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const doc_info & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
};

void swap(doc_info &a, doc_info &b);

inline std::ostream& operator<<(std::ostream& out, const doc_info& obj)
{
  obj.printTo(out);
  return out;
}


class QueryFailure : public ::apache::thrift::TException {
 public:

  QueryFailure(const QueryFailure&);
  QueryFailure& operator=(const QueryFailure&);
  QueryFailure() : code(0), desc() {
  }

  virtual ~QueryFailure() throw();
  int8_t code;
  std::string desc;

  void __set_code(const int8_t val);

  void __set_desc(const std::string& val);

  bool operator == (const QueryFailure & rhs) const
  {
    if (!(code == rhs.code))
      return false;
    if (!(desc == rhs.desc))
      return false;
    return true;
  }
  bool operator != (const QueryFailure &rhs) const {
    return !(*this == rhs);
  }

  bool operator < (const QueryFailure & ) const;

  uint32_t read(::apache::thrift::protocol::TProtocol* iprot);
  uint32_t write(::apache::thrift::protocol::TProtocol* oprot) const;

  virtual void printTo(std::ostream& out) const;
  mutable std::string thriftTExceptionMessageHolder_;
  const char* what() const throw();
};

void swap(QueryFailure &a, QueryFailure &b);

inline std::ostream& operator<<(std::ostream& out, const QueryFailure& obj)
{
  obj.printTo(out);
  return out;
}

} // namespace

#endif