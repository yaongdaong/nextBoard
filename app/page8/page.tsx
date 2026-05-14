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
    const [form, setForm] = useState({ title: '', content: '' });
    const [posts, setPosts] = useState<Post[]>([]);
    const [edit, setEdit] = useState<Post | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);
    const addPost = () => {
        // 유효성검사
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }
        // 게시글 인스턴스
        const newPost = {
            id: Date.now(),
            ...form,
            date: new Date().toISOString().split('T')[0],
        };
        // 게시글 목록에 저장
        // setPosts((prev)=>[...prev,newPost]); =>틀림
        setPosts((prev) => [newPost, ...prev]);
        // 입력창 비우기
        setForm({ title: '', content: '' });
    };
    const inputPost = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // setForm({title:e.target.value, content:e.target.value}); => 틀림
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const clickEdit = (post: Post) => {
        // 수정글 가져오기
        setEdit(post);
        // 창id가져오기
        setOpenId(post.id);
    };
    const inputEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEdit((prev) => (prev ? { ...prev, [name]: value } : null));
    };
    const saveEdit = () => {
        // 빼먹음
        if (!edit) return;
        // 틀림
        setPosts((prev) => prev.map((p) => (edit.id === p.id ? edit : p)));
        // 빼먹음
        setEdit(null);
        setOpenId(null);
    };
    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };
    const togglePost = (id: number) => {
        // 유효성
        if (edit) {
            alert('취소/저장 버튼을 눌러 수정을 완료하세요.');
            return;
        }
        setOpenId((prev) => (prev === id ? null : id));
    };
    return (
        // 입력
        <div className={styles.container}>
            <div className={styles.textBox}>
                <input
                    className={styles.title}
                    name='title'
                    value={form.title}
                    onChange={inputPost}
                    placeholder='제목'
                />
                <textarea
                    className={styles.content}
                    name='content'
                    value={form.content}
                    onChange={inputPost}
                    placeholder='내용'
                />
                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={addPost}>
                        등록
                    </button>
                </div>
            </div>
            <ul className={styles.ul}>
                {posts.map((post) => {
                    const isOpen = openId === post.id;
                    const isEdit = edit?.id === post.id;
                    return (
                        <li className={styles.li} key={post.id}>
                            <div className={styles.list}>
                                <h3 onClick={() => togglePost(post.id)}>{post.title}</h3>
                                <div className={styles.buttonBox}>
                                    <button
                                        className={styles.button}
                                        onClick={() => clickEdit(post)}>
                                        수정
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={() => deletePost(post.id)}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                            {isOpen && (
                                <div className={styles.open}>
                                    {isEdit ? (
                                        <div>
                                            <input
                                                className={styles.title}
                                                name="title"
                                                value={edit?.title||''}
                                                onChange={inputEdit}
                                            />
                                            <textarea
                                                className={styles.content}
                                                name="content"
                                                value={edit?.content||''}
                                                onChange={inputEdit}
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
                                    ) : (
                                        <div>
                                            <p>{post.content}</p>
                                            <small className={styles.detail}>{post.date}</small>
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
