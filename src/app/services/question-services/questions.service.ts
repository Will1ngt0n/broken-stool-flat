import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }
  submitQuestion(uname, email, question){
    return firebase.firestore().collection('FAQs').add({
      name: uname,
      email: email,
      question: question,
      timestamp: new Date().getTime()
    }).then( log => {
      return 'success'
    })
  }
  retrieveQuestions(){
    return firebase.firestore().collection('FAQs').orderBy('timestamp', 'desc').get().then(result => {
      let questions : Array<any> = []
      for(let key in result.docs){
        let data = result.docs[key].data()
        let docRef = result.docs[key].id
        questions.push({data: data, docRef: docRef})
      }
      if(questions.length > 0){
        return questions
      }else if(questions.length === 0){
        return null
      }
    })
  }
  submitAnswer(docRef, question, name, email, answer){
    return firebase.firestore().collection('AnsweredQuestions').doc(docRef).set({
      question: question,
      name: name,
      email: email,
      answer: answer,
      timestamp: new Date().getTime()
    }).then(() => {
      return 'success'
    }).catch( () => {
      return 'error'
    })
  }
  retrieveAnsweredQuestions(){
    return firebase.firestore().collection('AnsweredQuestions').get().then(result => {
      let questions : Array<any> = []
      for(let key in result.docs){
        let data = result.docs[key].data()
        let docRef = result.docs[key].id
        questions.push({data: data, docRef: docRef})
      }
      if(questions.length > 0){
        return questions
      }else if(questions.length === 0){
        return null
      }
    })
  }
}
