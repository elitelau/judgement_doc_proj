LIB = libthrift_grouping_server.a
export CXX

CPP_SRC = $(wildcard *.cpp)
CPP_HD = $(wildcard *.h)
CPP_OBJ = $(subst .cpp,.o,${CPP_SRC})

$(LIB): $(CPP_OBJ)	
	ar -rvs $@ *.o

$(CPP_OBJ) : %.o : %.cpp $(CPP_HD)
	$(CXX) -c $< -I$$HOME/software/thrift/include/ -I .

clean:
	rm -f $(LIB)	\
	rm -rf *.o
	

