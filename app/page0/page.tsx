"use client";
import { useState } from "react";

// 게시글 데이터 구조 정의
type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function Board() {
    // ---------------------------------------------------------
    // 1. 상태(State) 관리
    // ---------------------------------------------------------
    const [posts, setPosts] = useState<Post[]>([
        { id: 1, title: "첫 게시물", content: "Next.js 게시판", date: "2026-04-22" },
    ]);
    
    // 새 글 작성을 위한 입력 필드 상태
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 수정 기능을 위한 상태
    const [editingId, setEditingId] = useState<number | null>(null); // 현재 수정 중인 글의 ID
    const [editPost, setEditPost] = useState<Post | null>(null);     // 수정 중인 글의 임시 데이터

    // ---------------------------------------------------------
    // 2. 핵심 로직 (CRUD)
    // ---------------------------------------------------------

    // [Create] 글 등록 함수
    const addPost = () => {
        if (!title || !content) return alert("내용을 입력하세요");

        const newPost: Post = {
            id: Date.now(), // 고유 ID 생성을 위해 현재 시간 활용
            title,
            content,
            date: new Date().toISOString().split("T")[0], // YYYY-MM-DD 형식으로 날짜 저장
        };

        setPosts([newPost, ...posts]); // 기존 글들 앞에 새 글 추가
        setTitle(""); // 입력창 초기화
        setContent("");
    };

    // [Update] 수정 시작: 선택된 글 정보를 임시 상태(editPost)로 복사
    const startEdit = (post: Post) => {
        setEditingId(post.id);
        setEditPost({ ...post });
    };

    // [Update] 수정 내용 실시간 반영: 입력값에 따라 필요한 필드만 변경
    const handleEditChange = (field: "title" | "content", value: string) => {
        // 수정할 데이터가 없으면 작업을 더 이상 진행하지 말고 여기서 즉시 멈춰라
        if (!editPost) return;
        // 기존 객체를 복사하고, [field] 키값만 새로운 value로 덮어씌움
        setEditPost({ ...editPost, [field]: value });
    };

    // [Update] 수정 완료: 변경된 데이터를 리스트에 반영
    const saveEdit = () => {
        if (!editPost) return;
        setPosts(posts.map((post) => (post.id === editingId ? editPost : post)));
        setEditingId(null);
        setEditPost(null);
    };

    // [Update] 수정 취소: 상태 초기화
    const cancelEdit = () => {
        setEditingId(null);
        setEditPost(null);
    };

    // [Delete] 글 삭제: 선택한 ID와 다른 글들만 남김
    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    // ---------------------------------------------------------
    // 3. UI 렌더링
    // ---------------------------------------------------------
    return (
        <main style={{ padding: "2rem", margin: "0 auto" }}>
            <h1>My Board</h1>

            {/* 글쓰기 폼 */}
            <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "2rem" }}>
                <input
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ display: "block", width: "100%", marginBottom: "10px", padding: "5px" }}
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ display: "block", width: "100%", marginBottom: "10px", padding: "5px" }}
                />
                <button onClick={addPost}>글 등록</button>
            </section>

            {/* 게시글 목록 */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                        {/* 수정 모드와 일반 모드 조건부 렌더링 */}
                        {editingId === post.id && editPost ? (
                            <div className="flex flex-col gap-3">
                                <input
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={editPost.title}
                                    onChange={(e) => handleEditChange("title", e.target.value)}
                                />
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={editPost.content}
                                    onChange={(e) => handleEditChange("content", e.target.value)}
                                />
                                <div className="flex justify-end gap-2">
                                    <button onClick={cancelEdit}>취소</button>
                                    <button onClick={saveEdit}>저장</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold">{post.title}</h3>
                                <p className="text-gray-600">{post.content}</p>
                                <div className="flex justify-between items-center">
                                    <small>{post.date}</small>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEdit(post)}>수정</button>
                                        <button onClick={() => deletePost(post.id)}>삭제</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}