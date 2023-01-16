pipeline {
  environment {
    imagename = "sharanyajayaram/bankdocker"
    dockerImage = ''
  }
  agent any
  stages {
    stage('Code checkout') {
      steps {
        checkout changelog: false, poll: false, scm: scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'a8bd30ae-cf89-453a-a8d0-d2c06cfd9174', url: 'https://github.com/SharanyaJayaram/basic-banking-system.git']])
      }
    }
    stage('Code Scan'){
      steps{
        def sonarScanner = tool name: 'shasonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    withSonarQubeEnv(credentialsId: 'b1fd1aa2-b57a-47c1-a581-3dbc8306cae6') {
        sh "${sonarScanner}/bin/sonar-scanner"
    }
      }
    }
      
 

    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build imagename
        }
      }
    }
    stage('Deploy Image') {
      steps{

          withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerhubPassword', usernameVariable: 'dockerhubUser')]) {
            sh "docker login -u ${env.dockerhubUser} -p ${env.dockerhubPassword}"
            sh 'docker push sharanyajayaram/bankdocker:latest'
          }



      }
    }
  }
}
