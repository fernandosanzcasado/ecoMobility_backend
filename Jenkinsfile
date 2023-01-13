pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        // stage('Test') {
        //     steps {
        //         sh 'npm test'
        //     }
        // }
        stage('Clear build') {
            steps {
                sh 'rm -r /var/lib/jenkins/workspace/deploy_ecoMobility_backend_EC2/node_modules'
            }
        }
        stage('Clear EC2') {
            steps {
                sh 'sudo ssh -i /home/alumne/.ssh/id_rsa ubuntu@13.38.96.212 rm -rf /home/ubuntu/ecoMobility_backend/*'
            }
        }
        stage('SCP Project') {
            steps {
                script {
                    try {
                      sh 'sudo scp -r -i /home/alumne/.ssh/id_rsa /var/lib/jenkins/workspace/deploy_ecoMobility_backend_EC2/* ubuntu@13.38.96.212:/home/ubuntu/ecoMobility_backend'
                    } catch (err) {
                      currentBuild.result = 'UNSTABLE'
                      throw err
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    try {
                      sh 'sudo ssh -i /home/alumne/.ssh/id_rsa ubuntu@13.38.96.212 sh /home/ubuntu/ecoMobility_backend/server.sh'
                    } catch (err) {
                      currentBuild.result = 'UNSTABLE'
                      throw err
                    }
                }
            }
        }
        

    }
}