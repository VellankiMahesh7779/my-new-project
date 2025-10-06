#!/bin/bash
# quick_build.sh - quick check for Java & C++

LOG_FILE="build.out"
> $LOG_FILE

# Java
echo "==== Building Java ====" | tee -a $LOG_FILE
cd Java_Project
mkdir -p bin
if javac -d bin *.java >> ../$LOG_FILE 2>&1; then
    echo "==== Java build SUCCESS ====" | tee -a ../$LOG_FILE
else
    echo "==== Java build FAILED ====" | tee -a ../$LOG_FILE
fi
cd ..

# C++
echo "==== Building C++ ====" | tee -a $LOG_FILE
cd CPP_Project
mkdir -p build && cd build
if cmake .. >> ../../$LOG_FILE 2>&1 && make >> ../../$LOG_FILE 2>&1; then
    echo "==== C++ build SUCCESS ====" | tee -a ../../$LOG_FILE
else
    echo "==== C++ build FAILED ====" | tee -a ../../$LOG_FILE
fi
cd ../..

echo "==== Quick build finished ====" | tee -a $LOG_FILE
