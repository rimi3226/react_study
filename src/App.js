import './App.css';
import { useState } from 'react';

// 컴포넌트
function Header(props) {
  return (
    <header>
      {/* props */}
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

//Nav
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}
      >{t.title}</a></li>);
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

//Article
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

//Create
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder='title' /></p>
        <p><textarea name="body" placeholder='body'></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article>
  )
}

//Update
function Update(props){
  const [title,setTitle]=useState(props.title);
  const [body,setBody]=useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder='title' value={title} onChange={event=>{
          setTitle(event.target.value);
        }}/></p>
        <p><textarea name="body" placeholder='body' value={body} onChange={event=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update"></input></p>
      </form>
    </article>
  )
}

//APP
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'javascript is ...' }
  ]);


  //모드 설정
  let content = null;
  let contextControl=null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>

  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) { //id를 State로 만든 이유. 여기에서 사용하려고
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl= <li><a href={'/update'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>

  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body };
      //기존 데이터 복제 후 변경
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);

      //모드 변경
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) { //id를 State로 만든 이유. 여기에서 사용하려고
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content =<Update title={title} body={body} onUpdate={(title,body)=>{
      const newTopics=[...topics];
      const updatedTopic={id:id, title:title, body:body};
      for (let i = 0; i < newTopics.length; i++) {
        if (topics[i].id === id) { //id를 State로 만든 이유. 여기에서 사용하려고
          newTopics[i]=updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Header title="STUDY"></Header>
      <Header title="REACT"></Header>

      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>

      {content}
      <ul>
        <li><a href='/create' onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
        
    </div>
  );
}

export default App;
