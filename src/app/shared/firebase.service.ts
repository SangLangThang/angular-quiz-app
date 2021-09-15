import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { ClientForm, ILogin, QuestionsForm } from '../models/User.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  login(payload: ILogin) {
    return this.firestore
      .collection('users', (ref) =>
        ref
          .where('username', '==', payload.username)
          .where('password', '==', payload.password)
      )
      .valueChanges();
  }

  addClient(clientForm: ClientForm) {
    return this.firestore.collection('clients').add(clientForm);
  }
  getClients() {
    return this.firestore.collection('clients').valueChanges().pipe(take(1));
  }
  getClient(clientId: string) {
    return this.firestore
      .collection('clients')
      .doc(clientId)
      .valueChanges()
      .pipe(take(1));
  }
  updateClient(clientId: string, score: number, time: number) {
    this.firestore
      .collection('clients')
      .doc(clientId)
      .update({ score: score, time: time });
  }

  getLevels() {
    return this.firestore
      .collection('levels')
      .valueChanges({ idField: 'levelId' })
      .pipe(take(1));
  }
  addLevel(name: string) {
    return this.firestore.collection('levels').add(name);
  }

  getTopics() {
    return this.firestore
      .collection('topics')
      .valueChanges({ idField: 'topicId' })
      .pipe(take(1));
  }
  getTopicsWithId(id: string) {
    return this.firestore
      .collection('topics', (ref) => ref.where('levelId', '==', id))
      .valueChanges({ idField: 'topicId' })
      .pipe(take(1));
  }
  addTopic(levelId: string, name: string) {
    return this.firestore
      .collection('topics')
      .add({ name: name, levelId: levelId });
  }

  getQuestions(topicId: string) {
    return this.firestore
      .collection('questions', (ref) => ref.where('topicId', '==', topicId))
      .valueChanges({ idField: 'questionId' })
      .pipe(take(1));
  }
  getQuestion(id: string) {
    return this.firestore.collection('questions').doc(id).valueChanges();
  }

  deleteQuestion(questionId: string) {}

  addQuestions(questions: QuestionsForm) {
    return this.firestore.collection('questions').add(questions);
  }
  editQuestions(id: string, questions: QuestionsForm) {
    return this.firestore.collection('questions').doc(id).update(questions);
  }
}
