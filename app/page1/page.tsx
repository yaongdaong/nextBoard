"use client";
import { useState } from "react";

// 1. 데이터 타입 정의
type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};
   // 2. 스타일 객체 (가장 중요)
    const styles = {
        boardWrapper: {
            margin: "20px auto",
            maxWidth: "600px",
            fontFamily: "sans-serif",
        },
        inputBox: {
            border: "2px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
        },
        inputBase: {
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            boxSizing: "border-box" as const,
        },
        inputContent: {
            height: "150px",
            resize: "none" as const,
        },
        buttonWrapper: {
            display: "flex",
            justifyContent: "flex-end",
        },
        btnRegister: {
            padding: "5px 12px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "14px",
        },
        // --- 목록 스타일 추가 ---
        postList: {
            padding: 0,
            margin: 0,
        },
        postItem: {
            border: "1px solid #eee",
            borderRadius: "5px",
            marginBottom: "10px",
            listStyle: "none",
            overflow: "hidden", // 펼쳐질 때 내용이 깔끔하게 보이도록
        },
        postHeader: {
            display: "flex",
            justifyContent: "space-between", // 제목은 왼쪽, 버튼은 오른쪽 핵심
            alignItems: "center",
            padding: "15px 20px",
            backgroundColor: "#fff",
            cursor: "pointer", // 클릭 가능하다는 표시
            transition: "background-color 0.2s",
        },
        postHeaderHover: {
            backgroundColor: "#f9f9f9",
        },
        postTitle: {
            margin: 0,
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            flex: 1, // 제목이 남은 공간 다 차지하게
        },
        postTitlePlaceholder: {
            // 예시 이미지처럼 보이게
            letterSpacing: "10px",
            color: "#666",
        },
        actionButtons: {
            display: "flex",
            gap: "5px",
            marginLeft: "20px",
        },
        actionBtn: {
            padding: "5px 12px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "14px",
        },
        // 버튼들을 감싸서 오른쪽으로 밀어주는 스타일
        editButtonWrapper: {
            display: "flex",
            justifyContent: "flex-end", // 오른쪽 정렬 핵심
            gap: "5px", // 버튼 사이의 간격
            marginTop: "10px", // 입력창과의 간격
        },

        // --- 펼쳐지는 내용 스타일 ---
        postBody: {
            padding: "20px",
            backgroundColor: "#fefefe",
            borderTop: "1px solid #eee",
        },
        postContentText: {
            margin: "0 0 15px 0",
            lineHeight: "1.6",
            color: "#555",
            whiteSpace: "pre-wrap" as const, // 줄바꿈 반영
        },
        postDate: {
            fontSize: "13px",
            color: "#999",
        },
    };
export default function Board() {
 

    // 3. 상태 관리
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editPost, setEditPost] = useState<Post | null>(null);

    // --- 핵심: 현재 펼쳐져 있는 글의 ID 상태 추가 ---
    const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

    // 4. 로직 함수들
    const addPost = () => {
        if (!title || !content) return alert("제목과 내용을 입력하세요");
        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString().split("T")[0],
        };
        setPosts([newPost, ...posts]);
        setTitle("");
        setContent("");
    };

    // --- 핵심: 제목 클릭 시 토글 함수 추가 ---
    const togglePost = (id: number) => {
        // 이미 펼쳐진 글을 다시 클릭하면 닫고, 아니면 펼침
        setExpandedPostId((prev) => (prev === id ? null : id));
    };

    const startEdit = (post: Post) => {
        setEditingId(post.id);
        setEditPost({ ...post });
        // 핵심: 수정 버튼을 누르면 해당 게시글을 자동으로 펼칩니다.
        setExpandedPostId(post.id);
    };

    const inputEdit = (field: "title" | "content", value: string) => {
        if (!editPost) return;
        setEditPost({ ...editPost, [field]: value });
    };

    const saveEdit = () => {
        if (!editPost) return;
        setPosts(posts.map((post) => (post.id === editingId ? editPost : post)));
        setEditingId(null);
        setEditPost(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditPost(null);
    };

    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        // 삭제한 글이 펼쳐져 있었다면 상태 초기화
        if (expandedPostId === id) setExpandedPostId(null);
    };

    // 5. UI 렌더링
    return (
        <div style={styles.boardWrapper}>
            <h1>board</h1>
            <div style={styles.inputBox}>
                <input
                    style={styles.inputBase}
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    style={{ ...styles.inputBase, ...styles.inputContent }}
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div style={styles.buttonWrapper}>
                    <button style={styles.btnRegister} onClick={addPost}>
                        등록
                    </button>
                </div>
            </div>

            {/* 게시물 목록 */}
            <ul style={styles.postList}>
                {posts.map((post) => (
                    <li key={post.id} style={styles.postItem}>
                        {/* --- 헤더 (제목 + 버튼) 영역 --- */}
                        <div
                            style={styles.postHeader}
                            onClick={() => togglePost(post.id)} // 헤더 전체 클릭 시 토글
                        >
                            <h3 style={{ ...styles.postTitle, ...styles.postTitlePlaceholder }}>{post.title}</h3>

                            <div style={styles.actionButtons}>
                                <button
                                    style={styles.actionBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startEdit(post);
                                    }} // 헤더 클릭 전파 방지
                                >
                                    수정
                                </button>
                                <button
                                    style={styles.actionBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePost(post.id);
                                    }} // 헤더 클릭 전파 방지
                                >
                                    삭제
                                </button>
                            </div>
                        </div>

                        {/* --- 핵심: 조건부 렌더링 (펼쳐졌을 때만 내용 표시) --- */}
                        {expandedPostId === post.id && (
                            <div style={styles.postBody}>
                                {editingId === post.id && editPost ? (
                                    // 수정 모드
                                    <>
                                        <input
                                            style={styles.inputBase}
                                            value={editPost.title}
                                            onChange={(e) => inputEdit("title", e.target.value)}
                                        />
                                        <textarea
                                            style={{ ...styles.inputBase, ...styles.inputContent }}
                                            value={editPost.content}
                                            onChange={(e) => inputEdit("content", e.target.value)}
                                        />
                                        <div style={styles.editButtonWrapper}>
                                            <button style={styles.actionBtn} onClick={cancelEdit}>
                                                취소
                                            </button>
                                            <button style={styles.actionBtn} onClick={saveEdit}>
                                                저장
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // 일반 보기 모드
                                    <>
                                        <p style={styles.postContentText}>{post.content}</p>
                                        <small style={styles.postDate}>{post.date}</small>
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
