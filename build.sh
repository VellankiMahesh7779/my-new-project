#!/bin/bash
# build.sh – Quick local build for Java & C++ with full error reporting

LOG_FILE="build.out"
> "$LOG_FILE"

JAVA_DIR="Java_Project"
CPP_DIR="CPP_Project"

JAVA_SUCCESS=1
CPP_SUCCESS=1

echo "==== Building Java ====" | tee -a "$LOG_FILE"
if [ -d "$JAVA_DIR" ]; then
    cd "$JAVA_DIR" || exit 1
    if ls *.java >/dev/null 2>&1; then
        mkdir -p bin
        javac -d bin *.java >> ../"$LOG_FILE" 2>&1
        if [ $? -eq 0 ]; then
            echo "==== Java build SUCCESS ✅ ====" | tee -a ../"$LOG_FILE"
            JAVA_SUCCESS=0
        else
            echo "==== Java build FAILED ❌ ====" | tee -a ../"$LOG_FILE"
            JAVA_SUCCESS=1
        fi
    else
        echo "No Java files to compile" | tee -a ../"$LOG_FILE"
        JAVA_SUCCESS=0
    fi
    cd ..
else
    echo "Java_Project folder not found!" | tee -a "$LOG_FILE"
    JAVA_SUCCESS=1
fi

echo "==== Building C++ ====" | tee -a "$LOG_FILE"
if [ -d "$CPP_DIR" ]; then
    CPP_SUCCESS=0
    cd "$CPP_DIR" || exit 1
    mkdir -p build_errors
    for file in *.cpp; do
        if [ -f "$file" ]; then
            g++ -c "$file" -o build_errors/"${file%.cpp}.o" >> ../"$LOG_FILE" 2>&1
            if [ $? -ne 0 ]; then
                echo "Error compiling $file " | tee -a ../"$LOG_FILE"
                CPP_SUCCESS=1
            fi
        fi
    done
    if [ $CPP_SUCCESS -eq 0 ]; then
        echo "==== C++ build SUCCESS ✅ ====" | tee -a ../"$LOG_FILE"
    else
        echo "==== C++ build FAILED ❌ ====" | tee -a ../"$LOG_FILE"
    fi
    cd ..
else
    echo "CPP_Project folder not found!" | tee -a "$LOG_FILE"
    CPP_SUCCESS=1
fi

# ==== Summary ====
echo "==== Build Summary ====" | tee -a "$LOG_FILE"
[ $JAVA_SUCCESS -eq 0 ] && echo "Java: SUCCESS  " | tee -a "$LOG_FILE" || echo "Java: FAILED  " | tee -a "$LOG_FILE"
[ $CPP_SUCCESS -eq 0 ] && echo "C++: SUCCESS  " | tee -a "$LOG_FILE" || echo "C++: FAILED  " | tee -a "$LOG_FILE"

if [ $JAVA_SUCCESS -ne 0 ] || [ $CPP_SUCCESS -ne 0 ]; then
    echo "==== Build finished with ERRORS! ❌ ====" | tee -a "$LOG_FILE"
    exit 1
else
    echo "==== Build finished SUCCESSFULLY ✅ ====" | tee -a "$LOG_FILE"
fi
