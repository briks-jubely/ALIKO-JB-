// js/progress.js
import { db, auth } from "./auth.js";
import {
  doc,
  setDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

export async function saveProgress(courseId, lessonId) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "progress", courseId);

  await setDoc(
    ref,
    {
      currentLesson: lessonId,
      completedLessons: arrayUnion(lessonId),
      updatedAt: Date.now()
    },
    { merge: true }
  );
}
