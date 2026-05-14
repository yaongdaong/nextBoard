"use client";
import { useState } from "react";
// 1.글 데이터 정의,타입지정
type Post = {
    id: number;
    title: string;
    content: string;
    date: string;
};
// 1. 공통으로 자주 쓰이는 스타일을 상수로 분리
const commonInput = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
};
const commonButton = {
    padding: "5px 12px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "14px",
};
const styles = {
    container: { margin: "20px auto", maxWidth: "600px" },
    textBox: { border: "2px solid #ccc", padding: "20px", marginBottom: "20px" },
    // 2. 스프레드 연산자를 사용하여 중복 제거
    title: { ...commonInput },
    content: {
        ...commonInput,
        height: "150px",
        resize: "none" as const,
    },

    buttonBox: { display: "flex", justifyContent: "flex-end", gap: "5px" }, // gap 추가 시 버튼 사이 간격 편리
    button: { ...commonButton },
    ul: { padding: 0, margin: 0 },
    li: {
        border: "1px solid #eee",
        borderRadius: "5px",
        marginBottom: "10px",
        listStyle: "none",
        overflow: "hidden",
    },
    listBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        backgroundColor: "#fff",
        cursor: "pointer",
    },
    listTitle: {
        margin: 0,
        fontSize: "16px", // 10px은 너무 작아보여서 16px로 추천드립니다.
        fontWeight: "bold",
        color: "#333",
        flex: 1,
    },
    openEditBox: { padding: "20px", backgroundColor: "#fefefe", borderTop: "1px solid #eee" },
    detailContent: {
        margin: "0 0 15px 0",
        lineHeight: "1.6",
        color: "#555",
        whiteSpace: "pre-wrap" as const,
    },
    detailDate: { fontSize: "13px", color: "#999" },
};
export default function Board() {
    // 2.상태정의(글(배열), 제목, 내용, 수정id(숫자/null), 수정내용(Post/null))
    // "이 posts라는 변수에는 앞으로 Post 타입의 데이터들을 리스트(배열) 형태로 차곡차곡 쌓아둘 거야!"라고 선언하는 것입니다.
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    //  | (1개): 타입을 정할 때 쓰는 "또는 (OR)" (TypeScript 문법)
    const [editPost, setEditPost] = useState<Post | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);
    // 3.생성
    const addPost = () => {
        // 내용없으면 알림창
        // || (2개): 비교를 할 때 쓰는 "또는 (OR)" (JavaScript 실행 문법)
        if (!title || !content) {
            alert("내용입력하세요");
            return;
        }
        // 새로운객체생성
        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString().split("T")[0],
        };
        // 글 저장(최신순은 새글왼쪽, 기존글펼쳐넣기)
        // ... (전개 연산자): 기존 배열을 복사해 새 배열을 만듦 => 리액트가 변화를 감지함 (화면 바뀜)
        setPosts((prev) => [newPost, ...prev]); //배열이라[]대괄호
        // 제목,내용초기화
        setTitle("");
        setContent("");
    };
    // 4.수정(수정버튼클릭, 수정입력, 수정저장)
    // 이 함수는 post라는 이름의 재료를 받아서 쓸 건데, 그 재료의 생김새는 반드시 Post 타입이어야 한다
    const clickEdit = (post: Post) => {
        // id, 내용가져오기
        setEditingId(post.id);
        setEditPost({ ...post }); //객체라서{}중괄호
        setOpenId(post.id);
    };
    // field:변경할필드명(title/content)
    // value:입력된값
    const inputEdit = (field: "title" | "content", value: string) => {
        // 예외처리(데이터없으면함수종료)
        if (!editPost) return;
        // 상태업데이트(기존데이터복사, 특성필드덮어쓰기)
        setEditPost({ ...editPost, [field]: value });
    };
    const saveEdit = () => {
        // 수정내용없으면함수종료
        if (!editPost) return;
        // 게시물 하나씩펼쳐서 id일치 확인후 일치하면 변경된내용 아니면 기존 내용으로 저장
        setPosts(posts.map((post) => (post.id === editingId ? editPost : post)));
        // 수정id,수정내용null로 초기화
        setEditingId(null);
        setEditPost(null);
    };
    // 수정취소(수정id,수정내용null로 초기화)
    const cancelEdit = () => {
        setEditingId(null);
        setEditPost(null);
    };
    // 5.삭제(id가져와서게시물변경filter함수로 id가다른것만남김)
    // map은 한바퀴도는데 개수변화있으면 안되고, filter는 한바퀴도는데 조건에 맞는 것만 남긴다
    const deletePost = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };
    // 글상세보기토글
    // const togglePost = (id: number) => {
    //     setOpenId((prev) => (prev === id ? null : id));
    // };
    // 상세보기를 닫을 때, 혹시 수정 중이었다면 수정 상태도 같이 초기화
    const togglePost = (id: number) => {
        setOpenId((prev) => {
            if (prev === id) {
                setEditingId(null); // 상세보기 닫을 때 수정 모드도 해제
                setEditPost(null);
                return null;
            }
            return id;
        });
    };
    return (
        <div style={styles.container} className="container">
            {/* 6.글쓰기(제목/내용/등록) */}
            <div style={styles.textBox} className="inputBox">
                <input
                    style={styles.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                />
                <textarea
                    style={styles.content}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용"
                />
                <div style={styles.buttonBox}>
                    <button style={styles.button} onClick={addPost}>
                        등록
                    </button>
                </div>
            </div>
            {/* 7.글목록보기(수정/삭제) */}
            <ul style={styles.ul}>
                {/* posts.map으로 배열펼치기 */}
                {posts.map((post) => (
                    <li style={styles.li} key={post.id}>
                        {/* 1. (목록보기)제목/수정/삭제  */}
                        <div style={styles.listBox} className="list">
                            <h3 style={styles.listTitle} onClick={() => togglePost(post.id)}>
                                {post.title}
                            </h3>
                            <div style={styles.buttonBox} className="button">
                                <button
                                    style={styles.button}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clickEdit(post);
                                    }}>
                                    수정
                                </button>
                                <button
                                    style={styles.button}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePost(post.id);
                                    }}>
                                    삭제
                                </button>
                            </div>
                        </div>

                        {openId === post.id && (
                            <div style={styles.openEditBox} className="openEdit">
                                {/* 2. (수정)제목/내용/저장/취소  */}
                                {editingId === post.id && editPost ? (
                                    <>
                                        <div className="edit">
                                            <input
                                                style={styles.title}
                                                value={editPost.title}
                                                onChange={(e) => inputEdit("title", e.target.value)}
                                            />
                                            <textarea
                                                style={styles.content}
                                                value={editPost.content}
                                                onChange={(e) => inputEdit("content", e.target.value)}
                                            />
                                        </div>
                                        <div style={styles.buttonBox} className="button">
                                            <button style={styles.button} onClick={cancelEdit}>
                                                취소
                                            </button>
                                            <button style={styles.button} onClick={saveEdit}>
                                                저장
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    //  2. (상세보기)제목/내용/수정/삭제
                                    <div>
                                        <p style={styles.detailContent}>{post.content}</p>
                                        <small style={styles.detailDate}>{post.date}</small>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
