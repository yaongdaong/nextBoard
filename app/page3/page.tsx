"use client"; // Next.js 클라이언트 컴포넌트 선언
import { useState } from "react";
import styles from "./board.module.css";

/**
 * [데이터 타입 정의]
 * id: 숫자 (고유값)
 * title: 문자열 (글 제목)
 * content: 문자열 (글 내용)
 * date: 문자열 (작성 날짜)
 */
type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function Board() {
    // ---------------------------------------------------------
    // 1. [상태 관리] : 화면에 변하는 데이터를 저장하는 저장소
    // ---------------------------------------------------------

    // 전체 게시글 목록 (배열)
    const [posts, setPosts] = useState<Post[]>([]);
    // 새 글 작성을 위한 입력창 상태(제목, 내용)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // 수정을 위한 상태
    // 현재 수정 중인 글의 ID (없으면 null)
    const [editId, setEditId] = useState<number | null>(null);
    // 수정할 내용을 임시 담는 객체
    const [editPost, setEditPost] = useState<Post | null>(null);
    // 게시글 상세 보기 상태 (어떤 글이 펼쳐져 있는지 ID 저장)
    const [openId, setOpenId] = useState<number | null>(null);
    // ---------------------------------------------------------
    // 2. [기능 구현] : 사용자의 행동(클릭, 입력) 처리
    // ---------------------------------------------------------

    // [글 생성]
    const addPost = () => {
        // 1. 유효성 검사: 제목이나 내용이 비어있으면 경고창을 띄우고 함수 종료
        if (!title || !content) {
            alert("제목과 내용을 모두 입력하세요");
            return;
        }
        // 2. 새 글 객체 생성: { id: 현재시간, title, content, date: 오늘날짜 }
        const newPost = {
            id: Date.now(),
            title,
            content,
            // *=*=*=*=* 어려움 *=*=*=*=*
            date: new Date().toISOString().split("T")[0],
        };
        // 3. 상태 업데이트: 기존 글 목록 앞에 새 글 추가 [...prev, newPost]
        setPosts((prev) => [newPost, ...prev]);
        // 4. 입력창 비우기: setTitle(""), setContent("")
        setTitle("");
        setContent("");
    };

    // [수정 모드 진입]
    // Post형태의 post를 가져와야 한다
    const clickEdit = (post: Post) => {
        // 1. 어떤 글을 수정할지 ID 저장 (setEditId)
        setEditId(post.id);
        // 2. 수정창에 기존 내용을 미리 채워넣기 위해 복사 (setEditPost)
        setEditPost({ ...post });
        // 3. 수정을 편하게 하기 위해 해당 글을 펼침 상태로 변경 (setOpenId)
        setOpenId(post.id);
    };

    // [수정 내용 입력]
    // *=*=*=*=* 어려움 *=*=*=*=*
    const inputEdit = (field: "title" | "content", value: string) => {
        // 1. field(제목인지 내용인지)에 따라 editPost의 특정 값만 변경
        if (!editPost) return;
        // 2. 스프레드 연산자 사용: setEditPost({ ...editPost, [field]: value })
        setEditPost({ ...editPost, [field]: value });
    };

    // [수정 완료 및 저장]
    const saveEdit = () => {
        // 1. 수정할 내용이 비어있는지 확인
        if (!editPost) return;
        // 2. 전체 글 목록(posts)을 순회(map)하면서:
        //    - 수정 중인 ID와 일치하면 -> 수정된 내용으로 교체
        //    - 일치하지 않으면 -> 기존 글 그대로 유지
        setPosts(posts.map((post) => (post.id === editId ? editPost : post)));
        // 3. 수정 상태 초기화: setEditId(null), setEditPost 초기화
        setEditId(null);
        setEditPost(null);
    };

    // [수정 취소]
    const cancelEdit = () => {
        // 1. 수정 중인 ID를 null로 변경하여 수정창 닫기
        setEditId(null);
        // 2. 임시 저장된 수정 내용 비우기
        setEditPost(null);
    };

    // [삭제]
    const deletePost = (id: number) => {
        // 1. filter 함수를 사용: 클릭한 ID와 다른 글들만 남겨서 새로운 배열 생성
        // 2. 생성된 배열로 게시글 목록 업데이트
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    // [상세 보기 토글]
    const togglePost = (id: number) => {
        // 1. 이미 열려있는 글을 다시 클릭하면 닫기 (null)
        // 2. 닫혀있는 글을 클릭하면 해당 ID 저장
        // 3. 글을 닫을 때 수정 모드도 함께 종료하는 로직 추가
        // *=*=*=*=* 어려움 *=*=*=*=*
        // 만약 지금 수정 중인 글이 있다면, 제목 클릭(상세창 닫기)을 무시한다!
        if (editId !== null) {
            alert("수정 중인 내용을 먼저 저장하거나 취소해주세요.");
            return;
        }

        setOpenId((prev) => (prev === id ? null : id));
    };

    // ---------------------------------------------------------
    // 3. [화면 렌더링] : 사용자에게 보여지는 UI (HTML)
    // ---------------------------------------------------------
    return (
        <div className={styles.boardContainer}>
            {/* [A] 새 글 작성 영역: input(제목), textarea(내용), button(등록) */}
            <div className={styles.textBox}>
                <input
                    className={styles.commonInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="재목"
                />
                <textarea
                    className={`${styles.commonInput} ${styles.content}`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용"
                />
                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={addPost}>
                        등록
                    </button>
                </div>
            </div>
            {/* [B] 게시글 목록 영역: posts.map()으로 반복 생성 */}
            {/*  1. 기본 보기: 제목 출력 + [수정], [삭제] 버튼*/}
            <ul className={styles.postList}>
                {posts.map((post) => (
                    <li className={styles.postItem} key={post.id}>
                        <div className={styles.itemHeader}>
                            <h3 className={styles.itemTitle} onClick={() => togglePost(post.id)}>
                                {post.title}
                            </h3>
                            {/* e.stopPropagation()수정/삭제 버튼을 눌렀을 때 부모인 li의 클릭 이벤트(상세보기 열기)가 같이 실행되는 것을 막음 */}
                            <div className={styles.buttonBox}>
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
                        {/* 2. 조건부 렌더링 (논리 연산자 && 활용):
                   - 클릭한 글의 ID와 OpenId가 같을 때만 상세 내용 표시
                   - 그 안에서 다시 editId와 현재 글 ID가 같으면 -> [수정창]
                   - 아니면 -> [일반 내용 보기] */}
                        {openId === post.id && (
                            <div className={styles.expandedArea}>
                                {editId === post.id && editPost ? (
                                    // [C] 수정창 UI: input(수정제목), textarea(수정내용), [저장], [취소] 버튼
                                    <div className={styles.textBox}>
                                        <input className={styles.commonInput}
                                            value={editPost.title}
                                            onChange={(e) => inputEdit("title", e.target.value)}
                                        />
                                        <textarea  className={`${styles.commonInput} ${styles.content}`}
                                            value={editPost.content}
                                            onChange={(e) => inputEdit("content", e.target.value)}
                                        />
                                        <div className={styles.buttonBox}>
                                            <button
                                                className={styles.button}
                                                onClick={cancelEdit}>
                                                취소
                                            </button>
                                            <button
                                                className={styles.button}
                                                onClick={saveEdit}>
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // [D] 상세 보기 UI: 글 내용, 작성 시간 표시
                                    <>
                                        <p className={styles.contentText}>{post.content}</p>
                                        <p className={styles.dateText}>{post.date}</p>
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
