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
    const [openId, setOpenId] = useState<number | null>(null);
    const [edit, setEdit] = useState<Post | null>(null);

    const addPost = () => {
        // 유효성
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }
        // 새 객체
        const newPost = {
            id: Date.now(),
            ...form,
            date: new Date().toISOString().split('T')[0],
        };
        // 저장
        setPosts((prev) => [newPost, ...prev]);
        // 입력창비우기
        setForm({ title: '', content: '' });
    };
    const inputPost = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // name,value를 입력된값으로지정
        const { name, value } = e.target;
        // form에 저장
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const clickEdit = (post: Post) => {
        // 수정폼에 저장
        setEdit(post);
        // 오픈아이디가져오기
        setOpenId(post.id);
    };
    const inputEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEdit((prev) => (prev ? { ...prev, [name]: value } : null));
    };
    const saveEdit = () => {
        // 유효성검사
        if (!edit) return;
        // 저장
        setPosts((prev) => prev.map((p) => (p.id === edit.id ? edit : p)));
        setEdit(null);
        setOpenId(null);
    };
    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };
    const togglePost = (id: number) => {
        if (edit) {
            alert('수정/취소를 눌러 수정을 완료하세요.');
            return;
        }
        setOpenId((prev) => (prev === id ? null : id));
    };
    return (
        <div className={styles.container}>
            {/* 입력(제목,내용,등록) */}
            <div className={styles.textBox}>
                <input
                    className={styles.title}
                    name='title'
                    value={form.title}
                    placeholder='제목'
                    onChange={inputPost}
                />
                <textarea
                    className={styles.content}
                    name='content'
                    value={form.content}
                    placeholder='내용'
                    onChange={inputPost}
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
                        // {/* 목록(제목,수정,삭제) */}
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
                                        // {/* 수정(제목,내용,저장,취소) */}
                                        <div>
                                            <input
                                                className={styles.title}
                                                name='title'
                                                value={edit.title}
                                                onChange={inputEdit}
                                            />
                                            <textarea
                                                className={styles.content}
                                                name='content'
                                                value={edit.content}
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
                                        // {/* 상세(내용,날짜) */}
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
