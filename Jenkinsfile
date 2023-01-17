pipeline {
  environment {
    def sonarScanner = tool name: 'shasonar' , type: 'hudson.plugins.sonar.SonarRunnerInstallation'
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
    stage('Code Scan') {
    steps {
      withSonarQubeEnv(installationName: 'shasonar', credentialsId: 'sonarid', envOnly: true) {
        //withSonarQubeEnv(credentialsId: 'sonarid')  {
            sh "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=develop -Dsonar.sources=. "
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
    stage('kubernetes') {
        steps {
            //node("Kubernetes") {
              script{
                sh """
                kubectl create -f kube-pod.yamlpod
                kubectl get pods
                kubectl get pods -o wide
            """
              }
            //}
        }
    }
  }
}
