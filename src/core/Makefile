
EXE = clusterJudgeServer
export CXX

$(EXE):	ClusterJudgeServer.cpp
	$(CXX) ClusterJudgeServer.cpp -o $(EXE) -I$$HOME/software/mysql/include/mysql -I gen-cpp/ -I $$HOME/software/thrift/include \
	-I $$HOME/software/redis/hiredis/ -L $$HOME/software/redis/hiredis/ -lhiredis\
 -L $$HOME/software/mysql/lib/mysql -l mysqlclient_r -L $$HOME/software/thrift/lib -l thrift \
 -L gen-cpp/ -lthrift_grouping_server -std=c++0x -Wl,-R$$HOME/software/thrift/lib/ -Wl,-R$$HOME/software/redis/hiredis 
  		
clean:
	rm -f $(EXE) *.o	\
	rm -rf logs
	

