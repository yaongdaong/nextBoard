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
        // 유효성검사
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }
        // 새객체
        const newPost = {
            id: Date.now(),
            ...form,
            date: new Date().toISOString().split('T')[0],
        };
        // 저장
        setPosts((prev) => [newPost, ...prev]);
        // 입력창 비우기
        setForm({ title: '', content: '' });
    };
    const inputPost = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // name, value로 입력된값
        const { name, value } = e.target;
        // 입력값 새게시물로 저장
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const clickEdit = (post: Post) => {
        // 수정할거가져오기
        setEdit(post);
        // 창열림id가져오기
        setOpenId(post.id);
    };
    const inputEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // name,value로 입력된 값
        const { name, value } = e.target;
        // 입력값 수정객체에 저장
        setEdit((prev) => (prev ? { ...prev, [name]: value } : null));
    };
    const saveEdit = () => {
        // 유효성검사
        if (!edit) return;
        // 수정객체를 게시물로저장
        setPosts((prev) => prev.map((p) => (p.id === edit.id ? edit : p)));
        // 수정,열림초기화(틀림)
        setEdit(null);
        setOpenId(null);
    };
    const deletePost = (id: number) => {
        // filter함수로 id일치하지않는 것만 남기기
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };
    const togglePost = (id: number) => {
        // 수정중일때 저장/취소 버튼누르고 창닫기
        if (edit) {
            alert('저장/취소 버튼을 눌러 수정을 완료하세요.');
            return;
        }
        // 이미열린창은닫고 안열린건 열기
        setOpenId((prev) => (prev === id ? null : id));
    };
    return (
        <div className={styles.container}>
            {/* 입력창(제목/내용/등록) */}
            <div className={styles.textBox}>
                <input
                    className={styles.title}
                    value={form.title}
                    name='title'
                    onChange={inputPost}
                    placeholder='재목'
                />
                <textarea
                    className={styles.content}
                    value={form.content}
                    name='content'
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
                                {/* 목록창(제목/수정/삭제) */}
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
                            {/* 수정창(제목/내용/저장/취소) */}
                            {isOpen && (
                                <div className={styles.open}>
                                    {isEdit ? (
                                        <div>
                                            <input
                                                className={styles.title}
                                                value={edit?.title || ''}
                                                name='title'
                                                onChange={inputEdit}
                                            />
                                            <textarea
                                                className={styles.content}
                                                value={edit?.content || ''}
                                                name='content'
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
                                            {/* 상세보기창(내용/날짜) */}
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
