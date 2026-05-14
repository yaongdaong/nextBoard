'use client';
import { useState } from 'react';
import styles from './board.module.css';
type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};
export default function Board() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [form, setForm] = useState({ title: '', content: '' });
    const [edit, setEdit] = useState<Post | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);
    const addPost = () => {
        // 유효성검사(title,content입력없을떄)
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력하세요');
            return;
        }
        const newPost = {
            id: Date.now(),
            ...form,
            date: new Date().toISOString().split('T')[0],
        };
        // 중괄호
        setPosts((prev) => [newPost, ...prev]);
        // form초기화
        setForm({ title: '', content: '' });
    };
    // ****** 어려움 ******
    // input이나 textarea에서 이벤트가 발생하면
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target; // input의 name="title"을 읽어옴
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    // Post형식으로 post받아옴
    const editPost = (post: Post) => {
        setEdit(post);
        setOpenId(post.id);
    };
    const saveEdit = () => {
        if (!edit) return;
        setPosts((prev) => prev.map((p) => (p.id === edit.id ? edit : p)));
        setEdit(null);
        setOpenId(null);
    };
    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };
    const togglePost = (id: number) => {
        if (edit) {
            alert('취소/저장버튼을눌러수정을완료하세요');
            return;
        }
        setOpenId((prev) => (prev === id ? null : id));
    };
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                <input
                    className={styles.title}
                    value={form.title}
                    placeholder='제목'
                    name='title'
                    onChange={handleChange}
                />
                <textarea
                    className={styles.content}
                    value={form.content}
                    placeholder='내용'
                    name='content'
                    onChange={handleChange}
                />

                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={addPost}>
                        등록
                    </button>
                </div>
            </div>
            <ul className={styles.ul}>
                {posts.map((post) => {
                    const isEdit = edit?.id === post.id;
                    const isOpen = openId === post.id;
                    return (
                        <li className={styles.li} key={post.id}>
                            <div className={styles.list}>
                                <h3 onClick={() => togglePost(post.id)}>{post.title}</h3>
                                <div className={styles.buttonBox}>
                                    <button
                                        className={styles.button}
                                        onClick={() => {
                                            editPost(post);
                                        }}>
                                        수정
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={() => {
                                            deletePost(post.id);
                                        }}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                            {
                                isOpen && (
                                    <div className={styles.open}>
                                        {
                                            isEdit ? (
                                                <>
                                                    <div>
                                                        <input
                                                            className={styles.title}
                                                            value={edit.title}
                                                            onChange={(e) =>
                                                                setEdit({
                                                                    ...edit,
                                                                    title: e.target.value,
                                                                })
                                                            }
                                                        />
                                                        <textarea
                                                            className={styles.content}
                                                            value={edit.content}
                                                            onChange={(e) =>
                                                                setEdit({
                                                                    ...edit,
                                                                    content: e.target.value,
                                                                })
                                                            }
                                                        />
                                                        <div className={styles.buttonBox}>
                                                            <button
                                                                className={styles.button}
                                                                onClick={saveEdit}>
                                                                저장
                                                            </button>
                                                            <button
                                                                className={styles.button}
                                                                onClick={() => setEdit(null)}>
                                                                취소
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* textBox */}
                                                </>
                                            ) : (
                                                // buttonBox
                                                <div>
                                                    <p>{post.content}</p>
                                                    <p className={styles.date}>{post.date}</p>
                                                </div>
                                            ) // detail
                                        }
                                        {/* isEdit */}
                                    </div>
                                ) // open
                            }
                            {/* isOpen */}
                        </li>
                    );
                    {
                        /* return */
                    }
                })}
                {/* posts.map */}
            </ul>
        </div> // container
    );
}

/* 어려운거정리
1. prev쓰기
setForm((prev) => ({ ...prev, [name]: value }));
// 게시글 수정
setPosts((prev) =>
  // 기존 배열을 하나씩 순회
  prev.map((p) =>
    // 현재 게시글 id와 수정할 게시글 id가 같으면
    p.id === edit.id
      // 수정된 데이터(edit)로 교체
      ? edit
      // 아니면 기존 게시글 유지
      : p
  )
);
// 게시글 삭제
setPosts((prev) =>
  // 배열을 순회하면서
  prev.filter((p) =>
    // 삭제할 id가 아닌 것만 남김
    // 즉 id가 같은 건 제거됨
    p.id !== id
  )
);
// 열려있는 게시글 토글
setOpenId((prev) =>
  // 이미 열려있는 id를 다시 누르면
  prev === id
    // 닫기(null)
    ? null
    // 아니면 해당 id 열기
    : id
);

2. name에 따른 입력값 처리
// input 또는 textarea 값이 바뀔 때 실행되는 함수
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  // 이벤트가 발생한 태그에서 name과 value를 꺼냄
  // 예: <input name="title" value="안녕" />
  // name = "title"
  // value = "안녕"
  const { name, value } = e.target;
  // form state 업데이트
  setForm((prev) => ({
    // 기존 form 값 유지
    // 예: content 값 안 사라지게 복사
    ...prev,
    // name 값을 key로 사용해서 해당 값만 변경
    // name이 "title"이면:
    // title: value 가 됨
    [name]: value,
  }));
};

3. 입력창에서 onChange로 수정값 덮어쓰기
// 제목 수정 input
onChange={(e) =>
  // edit 상태 업데이트
  setEdit({
    // 기존 edit 객체 값 유지
    ...edit,
    // title만 새 입력값으로 변경
    title: e.target.value,
  })
}
// 내용 수정 textarea
onChange={(e) =>
  // edit 상태 업데이트
  setEdit({
    // 기존 데이터 유지
    ...edit,
    // content만 새 값으로 변경
    content: e.target.value,
  })
}
*/
