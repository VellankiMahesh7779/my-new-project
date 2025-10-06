pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: '25s',
                    url: 'https://github.com/VellankiMahesh7779/my-new-project.git'
            }
        }

        stage('Build C++ (CPP_Project)') {
            steps {
                dir('CPP_Project') {
                    sh '''#!/bin/bash
                        set -o pipefail
                        if [ -f CMakeLists.txt ]; then
                            echo "=== Building C++ project inside CPP_Project ==="
                            mkdir -p build
                            cd build
                            cmake .. 2>&1 | tee ../cpp_build.log
                            make 2>&1 | tee -a ../cpp_build.log
                        else
                            echo "⚠️ No CMakeLists.txt found in CPP_Project"
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Build Java (Java_Project)') {
            steps {
                dir('Java_Project') {
                    sh '''#!/bin/bash
                        set -o pipefail
                        if ls *.java >/dev/null 2>&1; then
                            echo "=== Compiling Java project inside Java_Project ==="
                            javac *.java 2>&1 | tee java_build.log
                        else
                            echo "⚠️ No Java files found in Java_Project"
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Build Standalone C++ (Root)') {
            steps {
                sh '''#!/bin/bash
                    set -o pipefail
                    if ls *.cpp >/dev/null 2>&1; then
                        echo "=== Compiling standalone C++ files in root directory ==="
                        g++ *.cpp -o output_cpp 2>&1 | tee cpp_root_build.log
                    else
                        echo "⚠️ No standalone C++ files found in root"
                    fi
                '''
            }
        }

        stage('Build Standalone Java (Root)') {
            steps {
                sh '''#!/bin/bash
                    set -o pipefail
                    if ls *.java >/dev/null 2>&1; then
                        echo "=== Compiling standalone Java files in root directory ==="
                        javac *.java 2>&1 | tee java_root_build.log
                    else
                        echo "⚠️ No standalone Java files found in root"
                    fi
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Build completed successfully. Check build logs for details."
        }
        failure {
            echo "❌ Build failed! Check the respective build.log files."
        }
    }
}
