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
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }
        const newPost = {
            id: Date.now(),
            // 틀림
            // title: form.title,
            // content: form.content,
            ...form,
            date: new Date().toISOString().split('T')[0],
        };
        setForm({ title: '', content: '' });
        // 틀림
        // setPosts({...newPost})
        setPosts((prev) => [newPost, ...prev]);
    };
    // 틀림
    // const handleChange = () => {
    //     e.React()
    //    `` e.target;
    // }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const editPost = (post: Post) => {
        // 수정할데이터가져오기
        // 틀림
        // setEdit((prev)=>{prev,,...post});
        setEdit(post);
        setOpenId(post.id);
    };
    const saveEdit = () => {
        // 빼먹음
        if (!edit) return;
        // 틀림
        // setPosts((prev)=>prev.map((p)=>p.id===post.id?edit:post));
        setPosts((prev) => prev.map((p) => (p.id === edit.id ? edit : p)));
        // 틀림
        // setForm({title:"",content:""});
        setEdit(null);
        setOpenId(null);
    };
    const togglePost = (id: number) => {
        // 틀림
        // setOpenId((prev) => (prev.id === id ? null : number));
        if (edit) {
            alert('취소/저장 버튼을 눌러 수정을 완료하세요');
            return;
        }
        setOpenId((prev) => (prev === id ? null : id));
    };
    const deletePost = (id: number) => {
        // 틀림
        // setPosts((prev)=>prev.filter(prev.id!==id));
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                <input className={styles.title} value={form.title} placeholder='제목' name='title' onChange={handleChange} />
                <textarea className={styles.content}
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
                {/* buttonBox */}
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
                                        onClick={() => editPost(post)}>
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
                                        // editBox
                                        <div>
                                            <input
                                                className={styles.title}
                                                value={edit.title}
                                                onChange={(e) =>
                                                    setEdit({ ...edit, title: e.target.value })
                                                }
                                            />
                                            <textarea
                                                className={styles.content}
                                                value={edit.content}
                                                onChange={(e) =>
                                                    setEdit({ ...edit, content: e.target.value })
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
                                    ) : (
                                        // detailBox
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
            {/* textBox */}
        </div> // container
    );
}
/* 1번
const [posts, setPosts] = useState<Post[]>([]);
const [edit, setEdit] = useState<Post|null>(null);
const [openId, setOpenId] = useState<number:null>(null);
const [form, setForm] = useState({title:"",content:""});
// 게시글추가(새로운인스턴스생성,입력값검사,새로운글저장,입력창초기화)
const addPost = () => {
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
    }
    if (!form.title.trim()||!form.content.trim()) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
        // 자꾸틀림
    // setPosts({...newPost});
    setPosts((post)=>[newPost,...prev])
    // form초기화
    setForm({title:"",content:""})
}
// #1
const addPost = () => {
    if (!form.title.trim()||!form.content.trim()){
        alert("제목과 내용을 모두 입력하세요");
        return;
    }
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
    };
    setPost((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
};
// #2
const addPost = () => {
    if(!form.title.trim()||!form.content.trim()) {
        alert("제목과 내용을 모두 입력하세요");
        return;
    }
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
    };
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""})
};
// #3
const addPost = () => {
    if (!form.title.trim()||!form.content.trim()){
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
    }
    setPosts((prev)=>[newPost, ...prev]);
    setForm({title:"",content:""});
};
// #4
const addPost = () => {
    if (!form.title.trim()||!form.content.trim()) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
    }
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
}
// #5
const addPost = () => {
    if(!form.title.trim()||!form.content.trim()) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0], 
    }
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
}
// #6
const addPost = () => {
    if (!form.title.trim()||!form.content.trim()) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPost = {
        id: Date.now().
        ...form,
        date: new Date().toISOStirng().split("T")[0]
    };
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
}
// #7
const addPost = () => {
    if (!form.title.trim()||!form.content.trime()) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
    }
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
}
// #8
const addPost = () => {
    if(!form.title.trim()||!form.content.trim()){
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPosts = {
        id: Date.now,
        ...form,
        date: new Date().toISOString().split("T")[0],
    }
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
}
// #9
const addPost = ()=> {
    if(!form.title.trim()||!form.content.trim()) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPost = {
        id: Date.now();
        ...form,
        date: new Date().toISOString().split("T")[0],
    }
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
}
// #10
const addPosts = () => {
    if(!form.title.trim()||!form.content.trim()){
        alert("제목과 내용을 모두 입력하세요.");
        return;
    }
    const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
    }
    setPosts((prev)=>[newPost,...prev]);
    setForm({title:"",content:""});
}
// input, textarea값이 바뀔 때 실행되는 함수 
// 외우기
// #1
const handleChange = (e:React.ChangeEvent<HTMLInputElemdnt|HTMLTextAreaElement>) => {
    // 이벤트발생태그에서 name,value꺼냄
    const {name,value} = e.target;
    // form state업데이트:기존form유지,name을key로사용해서해당값만변경
    setForm((prev)=>({...prev,[name]:value}));
}
// #2
// input 또는 textarea 값이 바뀔 때 실행되는 함수
const handlleChange = (e:React.ChangeEvent<HtmlInputElement|HTMLTextAreaElement>)=>{
// 이벤트가 발생한 태그에서 name과 value를 꺼냄
    const {name, value} = e.target;
    // form state 업데이트
    setForm((prev)=>({
        // 기존 form값 유지
        ...prev,
        // name값을 key로 사용해서 해당 값만 변경
        [name]:value,
    }))
}
// #3
// input,textarea 값이 바뀔 때 실행되는 함수
const handleChange = (
    e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    // 이벤트가 발생한 태그에서 name과 value를 꺼냄
    const {name, value} = e.target;
    // form state 업데이트
    setForm((prev)=>({
    // 기본form유지
    ...prev,
    // name값을 key로 사용해서 해당 값만 변경
    [name]:value,
    }));
};
// #4
// input,textarea 값이 바뀔 때 실행되는 함수
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    // 이벤트가 발생한 태그에서 name과 value를 꺼냄
    const {name, value} = e.target;
    // form state 업데이트
    setForm((prev)=>({
        // 기본form유지
        ...prev,
        // name값을 key로 사용해서 해당 값만 변경
        [name]:value,
    }))
}
// #5
// input, textarea 값이 바뀔 때 실행되는 함수
const handleChage = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    // 이벤트가 발생한 태그에서 name과 value를 꺼냄
    const {name,value} = e.target;
    // form state 업데이트
    setForm((prev)=>({
        // 기본form유지
        ...prev,
        // name값을 key로 사용해서 해당 값만 변경
        [name]:value,
    }))
}
// #6
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value}=e.target;
    setForm((prev)=>({...prev,[name]:value}));
} 
// #7
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.taget;
    setForm((prev)=>({...prev,[name]:value}));
}
// #8
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev,[name]:value}));
}
// #9
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTexAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev,[name]:value}));
}
// #10
const handleChange = (e:React.ChangeEvent<HtmlInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev,[name]:value}));
}
// #11
const handleChange = (e.React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement)>=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// #12
const handleChange = (e.React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// #13
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// #14
const handleChange = (e.React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// #15
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// #16
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// #17
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// #18
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.targetl
    setForm((prev)=>({...prev},[name]:value));
}
// #19
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.targetl
    setForm((prev)=>({...prev},[name]:value));
}
// #20
const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setForm((prev)=>({...prev},[name]:value));
}
// post:Post
const editPost = (post:Post) => {
    setEdit(post);
    // setOpenId(null);
    setOpenId(post.id);
}
// #1
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #2
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #3
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #4
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #5
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #6
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #7
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #8
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #9
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
// #10
const editPost = (post:Post) => {
    setEdit(post);
    setOpenId(post.id);
}
const saveEdit = () => {
    // 유효성검사
    if(!edit) return;  
    setPost((prev)=>prev.map((p)=>p.id===edit.id?edit:p))
    // 수정,펼침초기화
    setEdit(null);
    setOpenId(null);
}
// #1
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.amp((p)=>p.id===edit.di?edit:p));
    setEdit(null);
    setOpenId(null);
}
// #2
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>p.id===edit.id?edit:p));
    setEdit(null);
    setOpenId(null);
}
// #3
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>p.id===edit.id?edit:p));
    setEdit(null);
    setOpenId(null);
}
// #4
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>p.id===edit.id?edit:p));
    setEdit(null);
    setOpenId(null);
}
// #5
const saveEdit = ()=> {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>p.id===edit.id?edit:p));
    setEdit(null);
    setOpenId(null);
} 
// #6
const saveEdit = ()=> {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>(p.id===edit.id?edit:p)));
    setEdit(null);
    setOpenId(null);
}
// #7
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>(p.id===edit.id?edit:p)));
    setEdit(null);
    setOpenId(null);
}
// #8
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>(p.id===edit.id?edit:p)));
    setEdit(null);
    setOpenId(null);
}
// #9
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>(p.id===edit.id?edit:p)));
    setEdit(null);
    setOpenId(null);
}
// #10
const saveEdit = () => {
    if(!edit) return;
    setPosts((prev)=>prev.map((p)=>(p.id===edit.id?edit:p)));
    setEdit(null);
    setOpenId(null);
}
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #1
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #2
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #3
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #4
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #5
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #6
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #7
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #8
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #9
const deletePost(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
// #10
const deletePosts(id:number) {
    setPosts((prev)=>prev.filter((p)=>p.id!==id));
}
const togglePost(id:number) {
    // 유효성검사
    if(edit) {
        alert("취소/저장을 눌러 수정을 완료하세요");
        return;
    }
        setOpenId((prev)=>prev===id?null:id);
}
// #1
const togglePost(id:number) {
    if(edit) {
        alert("취소/저장을 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
// #2
const togglePost(id:number) {
    if(edit) {
        alert("취소/저장을 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
// #3
const togglePost(id:number) {
    if(edit) {
        alert("저장/취소를 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
// #4
const togglePost(id:number) {
    if(edit) {
        alert("저장/취소를 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
// #5
const togglePost(id:number) {
    if(edit) {
        alert("저장/취소를 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
// #6
const togglePost(id:number) {
    id(edit) {
        alert("저장/취소를 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev==id?null:id);
}
#7
const togglePost(id:number) {
    if(edit) {
        alert("저장/취소를 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
#8
const togglePost(id:number) {
    if(edit) {
        alert("저장/취소를 눌러 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
#9
const togglePost(id:number) {
    if(edit) {
        alert('저장/취소를 눌러 수정을 완료하세요');
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
#10
const togglePost(id:number) {
    if(edit) {
        alert("저장/취소를 눌러서 수정을 완료하세요");
        return;
    }
    setOpenId((prev)=>prev===id?null:id);
}
*/
/* 
// #1
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} name="title" value={form.title} onChange={handleChange} placeholder="제목"/>
            <textarea className={styles.content} name="content" value={form.content} onChange={handleChange} placeholder="내용"/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>{
                const isEdit = edit?.id === post.id;
                const isOpen = opendId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        // 1번은 isOpen-true isEdit-true 2번은 isOpen-true isEdit-false
                        {isOpen&&
                            <div>
                                {isEdit?
                                    (<div className={styles.editBox}>
                                        <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                        <textarea className={styles.content} value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onClick={saveEdit}>저장</button>
                                            <button className={styles.button} onClick={()=>setEdit(null)}>취소</button>
                                        </div>
                                    </div>):
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>)}
                            </div>
                        }
                    </li>
                )
            }}
        </ul>
    </div>
)
// #2
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} value={form.title} name="title" placeholder="제목" onChange={handleChange}/>
            <textarea  className={styles.content} value={form.content} name="content" placeholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>
                const isEdit = edit?.id === post.id;
                const isOpen = openId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.listBox}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={editPost(post)}>수정</button>
                                <button className={styles.button} onClick={deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?
                                    // editBox
                                    (<div>
                                        <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                        <textarea className={styles.content} value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onClick={saveEdit}>저장</button>
                                            <button className={styles.button} onClick={()=>setEdit(null)}>취소</button>
                                        </div>
                                    </div>):
                                    // detailBox
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small/>
                                    </div>)}
                            </div>
                        }
                    </li>
                );
            )}
        <ul/>
    </div>
)
// #3
return(
    <div className={styles.container}>
        <div classNmae={styles.textBox}>
            <input className={style.title} value={form.title} name="title" placeholder="제목" onChange={handleChange}/>
            <textarea className={styles.content} value={form.content} name="content" placeholder="내용" onChance={handleChange}/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</div>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>
                const isEdit = edit?.id === post.id;
                const isOpen = openId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onclick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?
                                    // editBox
                                    (<div>
                                        <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                        <textarea className={styles.content} value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onclick={saveEdit}>저장</button>
                                            <button className={styles.button} onclick={()=>setEdit(null)}>취소</button>
                                        </div>
                                    </div>):
                                    // detailBox
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>)}
                            </div>}
                    </li>
                );
            )}
        </ul>
    </div>
)
// #4
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} name="title" value={form.title} placeholder="제목" onChange={handleChange}/>
            <textarea className={styles.content} name="content" value={form.content} placeholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>
                const isEdit = edit?.id === post.id;
                const isOpen = openId === post.id;
                <li className={styles.li} key={post.id}>
                    <div className={styles.list}>
                        <h3 onClick={togglePost(post.id)}>{post.title}</h3>
                        <div className={styles.buttonBox}>
                            <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                            <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                        </div>
                    </div>
                </li>
            )}
        </ul>
    </div>
)
// #5
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} name="title" value={form.title} placeholder="제목" onChange={handleChange}/>
            <textarea className={styles.content} name="content" value={form.content} placeholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>
                const isEdit = edit?.id === post.id;
                const idOpen = openId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?
                                    // editBox
                                    (<div>
                                        <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                        <textarea  className={styles.content}value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button}onClick={saveEdit}/>저장</button>
                                            <button className={styles.button} onClick={()=>setEdit(null)}/>취소</button>
                                        </div>
                                    </div>):
                                    // detailBox
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>)}
                            </div>}

                    </li>
                );
            )}
        </ul>
    </div>
)
// #6
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} name="title" value={form.title} placeholder="제목" onChange={handleChange}/>
            <textarea className={styles.content} name="content" value={form.content} placeholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>
                const isEdit = edit?.id === post.id;
                const isOpen = openId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div> 
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?
                                    // editBox
                                    (<div>
                                        <input className={styles.title} value={title} onChange={(e)=>setEdit({...edit,title:e.target.value})} />
                                        <textarea className={styles.content} value={content} onChange={(e)=>setEdit({...edit,content:e.target.value})} />
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onClick={saveEdit}>저장</button>
                                            <button className={styles.button} onClick={()=>setEdit(null)}>취소</button>
                                        </div>
                                    </div>):
                                    // detailBox
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>)}
                            </div>
                        }
                    </li>
                );
            )}
        </ul>
    </div>
)
// #7
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input  className={styles.title} name="title" value={form.title} placeholder="제목" onChange={handleChange}/>
            <textarea className={styles.content} name="content" value={form.content} placeholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}> 
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>{
                const isEdit = edit?.id === post.id;
                const isOpen = openId = post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?
                                    // editBox
                                    (<div>
                                        <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                        <textarea className={styles.content} value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onClick={saveEdit}>저장</button>
                                            <button className={styles.button} onClick={()=>setEdit(null)}>취소</button>
                                        </div>
                                    </div>):
                                    // detailBox
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>)}
                            </div>
                        }
                    </li>
                );
            })}
        </ul>
    </div>
)
// #8
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} name="title" value={form.title} placeholder="제목" onChange={handleChange}/> 
            <textarea className={styles.content} name="content" value={form.content} placeholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>{
                const isEdit = edit?.id === post.id;
                const isopen = openId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?
                                    // editBox
                                    (<div>
                                        <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                        <textarea className={styles.content} value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onClick={saveEdit}>저장</button>
                                            <button className={styles.button} onClick={()=>setEdit(null)}>취소</button>
                                        </div>
                                    </div>):
                                    // detailBox
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>)}
                            </div>
                        }
                    </li>
                );
            })}
        </ul>
    </div>
)
// #9
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} name="title" value={form.title} placeholder="제목" onChange={handleChange}/>
            <textarea className={styles.content} name="content" value={form.content} placeholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}> 
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>{
                const isEdit = edit?.id === post.id;
                const isOpen = openId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?(
                                    // editBox
                                    <div>
                                        <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                        <textarea className={styles.content} value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                        <div className={styles.buttonBox}>
                                            <button className={styles.button} onClick={saveEdit}>저장</button>
                                            <button className={styles.button} onClick={()=>setEdit(null)}>취소</button>
                                        </div>
                                    </div>):
                                    // detailBox
                                    <div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>}
                            </div>
                        }
                    </li>
                );
            })}
        </ul>
    </div>
)
// #10
return(
    <div className={styles.container}>
        <div className={styles.textBox}>
            <input className={styles.title} name="title" value={form.title} plceholder="제목" onChange={handleChange}/>
            <textarea className={styles.content} name="content" value={form.content} plceholder="내용" onChange={handleChange}/>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={addPost}>등록</button>
            </div>
        </div>
        <ul className={styles.ul}>
            {posts.map((post)=>{
                const isEdit = edit?.id === post.id;
                const isOpen = openId === post.id;
                return(
                    <li className={styles.li} key={post.id}>
                        <div className={styles.list}>
                            <h3 onClick={()=>togglePost(post.id)}>{post.title}</h3>
                            <div className={styles.buttonBox}>
                                <button className={styles.button} onClick={()=>editPost(post)}>수정</button>
                                <button className={styles.button} onClick={()=>deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                        {isOpen&&
                            <div className={styles.open}>
                                {isEdit?
                                    // editBox
                                    (<div>
                                    <input className={styles.title} value={edit.title} onChange={(e)=>setEdit({...edit,title:e.target.value})}/>
                                    <textarea className={styles.content} value={edit.content} onChange={(e)=>setEdit({...edit,content:e.target.value})}/>
                                    <div className={styles.buttonBox}>
                                        <button className={styles.button} onClick={saveEdit}>저장</button>
                                        <button className={styles.button} onClick={()=>setEdit(null)}>취소</button>
                                    </div>
                                    </div>):
                                    // detailBox
                                    (<div>
                                        <p>{post.content}</p>
                                        <small className={styles.detail}>{post.date}</small>
                                    </div>)}
                            </div>
                        }
                    </li>
                );
            })}
        </ul>
    </div>
) 
 */
