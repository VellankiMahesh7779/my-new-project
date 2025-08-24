pipeline {
    agent any
    environment {
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk-amd64'
        PATH = "${env.JAVA_HOME}/bin:${env.PATH}"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: '25s', url: 'https://github.com/VellankiMahesh7779/my-new-project.git'
            }
        }

        stage('Build') {
            parallel {
                stage('Build C++') {
                    steps {
                        dir('CPP_Project') {
                            sh '''
                                if [ -f CMakeLists.txt ]; then
                                    mkdir -p build
                                    cd build
                                    cmake ..
                                    make -j4
                                else
                                    echo "No CMakeLists.txt found in CPP_Project"
                                fi
                            '''
                        }
                    }
                }
                stage('Build Java') {
                    steps {
                        dir('Java_Project') {
                            sh 'javac *.java || echo "No Java files found in Java_Project"'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('C++ Tests') {
                    steps {
                        dir('CPP_Project/build') {
                            sh 'ctest || echo "No C++ tests found"'
                        }
                    }
                }
                stage('Java Tests') {
                    steps {
                        dir('Java_Project') {
                            sh 'echo "Add JUnit or other test commands here"'
                        }
                    }
                }
            }
        }

        stage('Package / Deploy') {
            steps {
                echo "Add packaging or deployment steps here"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}

