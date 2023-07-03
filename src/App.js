import './App.css';

// 컴포넌트
function Header(props) {
  return (
    <header>
      {/* props */}
      <h1><a href="/">{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis=[]
  for(let i=0; i<props.topics.length;i++){
    let t=props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>);
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function App() {
  const topics=[
    {id:1,title:'html',body:'html is ...'},
    {id:2,title:'css',body:'css is ...'},
    {id:3,title:'js',body:'javascript is ...'},
  ]
  return (
    <div>
      <Header title="REACT"></Header>
      <Header title="STUDY"></Header>
      <Header title="REACT"></Header>

      <Nav topics={topics}></Nav>

      <Article title="Welcome" body="Hello, Web"></Article>
      <Article title="Hi" body="Hello, React"></Article>
    </div>
  );
}

export default App;
