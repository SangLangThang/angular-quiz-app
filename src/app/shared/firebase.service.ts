import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ClientForm, ILogin, QuestionsForm, User } from '../models/User.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  usersRef: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersRef = this.firestore.collection('users');
  }

  login(payload: ILogin) {
    return this.firestore
      .collection('users', (ref) =>
        ref
          .where('username', '==', payload.username)
          .where('password', '==', payload.password)
      )
      .valueChanges();
  }

  getUsers() {
    return this.usersRef.valueChanges();
  }

  addClient(clientForm: ClientForm) {
    return this.firestore.collection('clients').add(clientForm);
  }
  getClient(clientId: string) {
    return this.firestore.collection('clients').doc(clientId).valueChanges();
  }
  updateClient(clientId: string, score: number) {
    this.firestore.collection('clients').doc(clientId).update({ score: score });
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
  getTopicsWithId(id:string) {
    return this.firestore
      .collection('topics',(ref) => ref.where('levelId', '==', id))
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
