"use client";
import { useState } from "react";
import styles from "./board.module.css";
type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};
type PostForm = Pick<Post, "title" | "content">;
export default function Board() {
    const [posts, setPosts] = useState<Post[]>([]);
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    // *****코드리팩토링*****:title+content=>form
    
    // const [form, setForm] = useState({ title: "", content: "" });
    const [form, setForm] = useState<PostForm>({ title: "", content: "" });
    // const [editId, setEditId] = useState<number | null>(null);
    // const [editPost, setEditPost] = useState<Post | null>(null);
    // *****코드리팩토링*****:editId+editPost=>editing
    const [editing, setEditing] = useState<Post | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);

    // *****코드리팩토링*****:newPost를 createPost로 함수를 따로 생성
    const createPost = (): Post => ({
        id: Date.now(),
        title: form.title,
        content: form.content,
        date: new Date().toISOString().split("T")[0],
    });
    const addPost = () => {
        // if (!title || !content) {
        // *****코드리팩토링*****:title+content=>form
        if (!form.title.trim() || !form.content.trim()) {
            alert("제목과 내용을 모두 입력하세요");
            return;
        }
        // const newPost = {
        //     id: Date.now(),
        //     title,
        //     content,
        //     date: new Date().toISOString().split("T")[0],
        // };
        // 이전글에 새글추가
        // setPosts((prev) => [newPost, ...prev]);
        // *****코드리팩토링*****:newPost를 createPost로 함수를 따로 생성
        setPosts((prev) => [createPost(), ...prev]);
        // setTitle("");
        // setContent("");
        // *****코드리팩토링*****:title+content=>form
        setForm({ title: "", content: "" });
    };
    const clickEdit = (post: Post) => {
        // setEditId(post.id);
        // // 수정글에 기존글추가
        // setEditPost({ ...post });
        // *****코드리팩토링*****:editId+editPost=>editing
        setEditing(post);
        setOpenId(post.id);
    };
    // const inputEdit = (field: "title" | "content", value: string) => {
    //     if (!editPost) return;
    //     // 기존 수정글 복사해서 새로입력된것만 덮어쓰기
    //     setEditPost({ ...editPost, [field]: value });
    // };
    // *****코드리팩토링*****:공통입력처리
    const handleChange = (field: "title" | "content", value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const saveEdit = () => {
        // if (!editPost) return;
        // setPosts((prev) => prev.map((post) => (post.id === editId ? editPost : post)));
        // setEditId(null);
        // setEditPost(null);
        // *****코드리팩토링*****:editId+editPost=>editing
        if (!editing) return;
        setPosts((prev) => prev.map((p) => (p.id === editing.id ? editing : p)));
        setEditing(null);
    };
    // const cancelEdit = () => {
    //     setEditId(null);
    //     setEditPost(null);
    // };
    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };
    const togglePost = (id: number) => {
        // if (editId !== null) {
        // *****코드리팩토링*****:editId+editPost=>editing
        if (editing) {
            alert("취소/저장버튼을눌러수정을완료하세요");
            return;
        }
        // 이전id값이같으면null아니면id값반환
        setOpenId((prev) => (prev === id ? null : id));
    };
    // 첫번째return(전체화면)
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                {/* *****코드리팩토링*****:title+content=>form */}
                <input
                    className={styles.title}
                    value={form.title}
                    onChange={(e) => {
                        handleChange("title", e.target.value);
                    }}
                    placeholder="제목"
                />
                <textarea
                    className={styles.content}
                    value={form.content}
                    onChange={(e) => {
                        handleChange("content", e.target.value);
                    }}
                    placeholder="내용"
                />
                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={addPost}>
                        등록
                    </button>
                </div>
            </div>

            <ul className={styles.listWrap}>
                {posts.map((post) => {
                    const isEditing = editing?.id === post.id;
                    const isOpen = openId === post.id;
                    // 두번째return:posts.map안의리턴
                    return (
                        <li className={styles.list} key={post.id}>
                            <div className={styles.listItem}>
                                <h3 onClick={() => togglePost(post.id)}>{post.title}</h3>
                                <div className={styles.buttonBox}>
                                    {/* e.stopPropagation으로 펼침이벤트랑중복방지 */}
                                    <button
                                        className={styles.button}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clickEdit(post);
                                        }}>
                                        수정
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePost(post.id);
                                        }}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                            {isOpen && (
                                <div className={styles.open}>
                                    {/* {editId === post.id && editPost ? ( */}
                                    {/* *****코드리팩토링*****:editId+editPost=>editing */}
                                    {isEditing ? (
                                        <div className={styles.textBox}>
                                            <input
                                                className={styles.title}
                                                value={editing.title}
                                                // 기존값을가져와서새로입력된값으로덮어쓰기
                                                onChange={(e) =>
                                                    setEditing({
                                                        ...editing,
                                                        title: e.target.value,
                                                    })
                                                }
                                                placeholder="제목"
                                            />
                                            <textarea
                                                className={styles.content}
                                                value={editing.content}
                                                onChange={(e) =>
                                                    setEditing({
                                                        ...editing,
                                                        content: e.target.value,
                                                    })
                                                }
                                                placeholder="내용"
                                            />
                                            <div className={styles.buttonBox}>
                                                <button
                                                    className={styles.button}
                                                    onClick={saveEdit}>
                                                    저장
                                                </button>
                                                <button
                                                    className={styles.button}
                                                    onClick={() => setEditing(null)}>
                                                    취소
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>{post.content}</p>
                                            <p className={styles.date}>{post.date}</p>
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
