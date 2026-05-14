"use client";
import { useState } from "react";
import styles from "./board.module.css";
type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};
export default function Board() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editPost, setEditPost] = useState<Post | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);
    const addPost = () => {
        // 유효성검사(빈칸)
        if(!title||!content) {alert("제목과내용을모두입력하세요");return;}
        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString().split("T")[0],
        };
        // 기존글앞에 새글추가
        setPosts((prev) => [newPost, ...prev]);
        setTitle("");
        setContent("");
    };
    const clickEdit = (post: Post) => {
        setEditId(post.id);
        setEditPost({ ...post });
        setOpenId(post.id);
    };
    // 파라미터(field:title/content,값:string)
    const inputEdit = (field: "title" | "content", value: string) => {
        // 유효성검사(수정할내용없을떄)
        if (!editPost) return;
        // 수정할내용업데이트([수정할것(title/content)]:값)
        setEditPost({ ...editPost, [field]: value });
    };
    const saveEdit = () => {
        // 유효성검사(수정할내용없을떄)
        if (!editPost) return;
        setPosts(posts.map((post) => (post.id === editId ? editPost : post)));
        setEditId(null);
        setEditPost(null);
    };
    const cancelEdit = () => {
        setEditId(null);
        setEditPost(null);
    };

    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };
    const togglePost = (id: number) => {
        if (editId !== null) alert("수정이나취소하고창을닫으세요");
        // 펼침id가이전꺼랑같으면없애고다르면id를반환
        setOpenId((prev) => (prev === id ? null : id));
    };
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                <input className={styles.title} placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className={styles.content} placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={addPost}>등록</button>
                </div>
            </div>
            <ul className={styles.postList}>
                {posts.map((post) => (
                    <li className={styles.postItem} key={post.id}>
                        <div className={styles.itemTitle}>
                            {/* 제목클릭하면펼침(토글) */}
                            <h3 onClick={() => togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                {/* e.stopPropagation으로 펼침이벤트랑 중복방지 */}
                                <button  className={styles.button}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clickEdit(post);
                                    }}>
                                    수정
                                </button>
                                <button  className={styles.button}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePost(post.id);
                                    }}>
                                    삭제
                                </button>
                            </div>
                        </div>
                        {openId === post.id && (
                            <div className={styles.open}>
                                {editId === post.id && editPost ? (
                                    <div className={styles.textBox}>
                                        <input className={styles.title}
                                            value={editPost.title}
                                            onChange={(e) => inputEdit("title", e.target.value)}
                                        />
                                        <textarea className={styles.content}
                                            value={editPost.content}
                                            onChange={(e) => inputEdit("content", e.target.value)}
                                        />
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onClick={saveEdit}>저장</button>
                                            <button className={styles.button} onClick={cancelEdit}>취소</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className={styles.detailContent}>{post.content}</p>
                                        <p className={styles.detailDate}>{post.date}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
