import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, take } from 'rxjs/operators';
import { ClientForm, ILogin, QuestionsForm } from '../models/User.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}
  isCreatedClient = false;
  isLogin = false;

  downloadURL: string;
  uploadFile(file: any) {
    const filePath = 'sang';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((downloadURL) => {
          this.downloadURL = downloadURL;
          console.log(this.downloadURL);
        });
      })
    );
  }
  login(payload: ILogin) {
    return this.firestore
      .collection('users', (ref) =>
        ref
          .where('username', '==', payload.username)
          .where('password', '==', payload.password)
      )
      .valueChanges()
      .pipe(take(1));
  }

  addClient(clientForm: ClientForm) {
    return this.firestore.collection('clients').add(clientForm);
  }
  getClients() {
    return this.firestore.collection('clients').valueChanges({ idField: 'id' });
  }
  getClient(clientId: string) {
    return this.firestore
      .collection('clients')
      .doc(clientId)
      .valueChanges()
      .pipe(take(1));
  }
  deleteClient(clientId: string) {
    return this.firestore.collection('clients').doc(clientId).delete();
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
  getTopicsWithLevelId(levelId: string) {
    return this.firestore
      .collection('topics', (ref) => ref.where('levelId', '==', levelId))
      .valueChanges({ idField: 'topicId' });
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
  deleteTopic(topicId: string) {
    return this.firestore.collection('topics').doc(topicId).delete();
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

  deleteQuestion(questionId: string) {
    return this.firestore.collection('questions').doc(questionId).delete();
  }
  addQuestions(questions: QuestionsForm) {
    return this.firestore.collection('questions').add(questions);
  }
  editQuestions(id: string, questions: QuestionsForm) {
    return this.firestore.collection('questions').doc(id).update(questions);
  }
}
