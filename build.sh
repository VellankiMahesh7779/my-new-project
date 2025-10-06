#!/bin/bash
# build.sh – Quick local build for Java & C++

LOG_FILE="build.out"
> "$LOG_FILE"

# ==== Java Build ====
echo "==== Building Java ====" | tee -a "$LOG_FILE"
cd Java_Project || exit 1

# Check if any .java files exist
if ls *.java >/dev/null 2>&1; then
    mkdir -p bin
    if javac -d bin *.java >> ../"$LOG_FILE" 2>&1; then
        echo "==== Java build SUCCESS 👍 ====" | tee -a ../"$LOG_FILE"
    else
        echo "==== Java build FAILED 👎 ====" | tee -a ../"$LOG_FILE"
    fi
else
    echo "No Java files to compile" | tee -a ../"$LOG_FILE"
fi

cd ..

# ==== C++ Build ====
echo "==== Building C++ ====" | tee -a "$LOG_FILE"
cd CPP_Project || exit 1
mkdir -p build && cd build || exit 1

if cmake .. >> ../../"$LOG_FILE" 2>&1 && make >> ../../"$LOG_FILE" 2>&1; then
    echo "==== C++ build SUCCESS 👍 ====" | tee -a ../../"$LOG_FILE"
else
    echo "==== C++ build FAILED 👎 ====" | tee -a ../../"$LOG_FILE"
fi

cd ../..

echo "==== Quick build finished ====" | tee -a "$LOG_FILE"
