pipeline {
    agent any
    environment {
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk'
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
                                mkdir -p build
                                cd build
                                cmake ..
                                make -j4
                            '''
                        }
                    }
                }
                stage('Build Java') {
                    steps {
                        dir('Java_Project') {
                            sh 'javac *.java || echo "No Java files found"'
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
                echo 'Add packaging or deployment steps here if needed'
            }
        }
    }

    post {
        success {
            githubNotify context: 'CI/CD Pipeline', status: 'SUCCESS'
            echo 'Build & Tests succeeded!'
        }
        failure {
            githubNotify context: 'CI/CD Pipeline', status: 'FAILURE'
            echo 'Build or Tests failed!'
        }
    }
}
