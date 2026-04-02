import { useState } from "react";
import Data from "../../../../Jsons/recursos.json";
import FlowerIcon from "../../../assets/Ellipse 49.png"; 
import Avatar from "../../../assets/Ellipse 63.png";
import { 
  IconBell, 
  IconInstagram, 
  IconBrandWhatsapp,
  IconInfoCircle,
  IconHeart,
  IconMessageCustom,
  IconDotsVertical,
  IconArrowBack,
  IconMuteCustom,
  IconReportCustom
} from "../../Icons/Icons"; 

interface Comentario {
  id: number;
  user: string;
  text: string;
  liked: boolean;
}

interface Post {
  id: number;
  author: string;
  type: string;
  time: string;
  content: string | string[]; // Soporta el array del JSON
  isParentIn: boolean;
  liked: boolean;
  comments: Comentario[];
  title?: string;
  subtitulo?: string;
}

const CommunityAvatar = ({ badge }: { badge: React.ReactNode }) => (
  <div className="relative w-10 h-10 shrink-0">
    <div className="w-full h-full rounded-full bg-[#D1D9F2] flex items-center justify-center overflow-hidden">
      <img src={FlowerIcon} alt="comunidad" className="w-7 h-7 object-contain" />
    </div>
    <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center shadow-sm">
      {badge}
    </div>
  </div>
);

export default function Comunidad() {
  const [postText, setPostText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  // Usamos el recurso del JSON (asegurando que el contenido no sea undefined con "|| []")
  const recursoJson = Data[21]; 

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Parent In",
      type: "ha publicado un nuevo material de lectura",
      time: "hace 1 hora",
      title: recursoJson.titulo,
      subtitulo: recursoJson.subtitulo,
      content: recursoJson.contenido || [], // Solución al error de 'undefined'
      isParentIn: true,
      liked: false,
      comments: [{ id: 201, user: "Laura M.", text: "Excelente información, gracias.", liked: false }]
    },
    {
      id: 2,
      author: "Mariana López",
      type: "ha realizado una nueva publicación",
      time: "hace 12 horas",
      content: "Hoy fue uno de esos días en los que el embarazo se sintió pesado...",
      isParentIn: false,
      liked: false,
      comments: [{ id: 101, user: "Ana García", text: "¡Ánimo Mariana!", liked: false }]
    }
  ]);

  const handleViewComments = (id: number) => {
    setSelectedPostId(id);
    setShowCommentInput(false);
  };

  const handleCommentClick = (id: number) => {
    setSelectedPostId(id);
    setShowCommentInput(true);
  };

  const handleBack = () => {
    setSelectedPostId(null);
    setShowCommentInput(false);
    setExpandedPostId(null);
  };

  const handleMuteUser = (postId: number) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    setActiveMenuId(null);
  };

  const handleAddPost = () => {
    if (!postText.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Tu Usuario", 
      type: "ha realizado una nueva publicación",
      time: "Recién ahora",
      content: postText,
      isParentIn: false,
      liked: false,
      comments: []
    };
    setPosts([newPost, ...posts]);
    setPostText(""); 
  };

  const handleAddComment = (postId: number) => {
    if (!newCommentText.trim()) return;
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, { id: Date.now(), user: "Tu Usuario", text: newCommentText, liked: false }] }
        : post
    ));
    setNewCommentText("");
  };

  const toggleLike = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, liked: !post.liked } : post));
  };

  const toggleCommentLike = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => 
            comment.id === commentId ? { ...comment, liked: !comment.liked } : comment
          )
        };
      }
      return post;
    }));
  };

  const toggleExpand = (id: number) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  const displayedPosts = selectedPostId ? posts.filter(p => p.id === selectedPostId) : posts;

  return (
    <div className="flex flex-col h-full max-w-[923px] font-sans text-[#393939] px-4 md:px-0 w-full mb-10">
      <header className="flex justify-between items-start w-full mt-6 md:mt-0 mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#393939] font-lora font-semibold text-[28px] md:text-[32px] leading-tight">Comunidad</h2>
          <p className="text-[#A3A3A3] font-glacial text-[14px] md:text-[16px]">Tu red de acompañamiento.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#F0F0F0] cursor-pointer">
            <img src={Avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="relative p-2 bg-white rounded-full border border-[#F0F0F0] cursor-pointer shrink-0">
            <IconBell className="w-6 h-6" />
            <div className="absolute top-1 right-1 w-[10px] h-[10px] bg-[#9FC47C] border-2 border-white rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          {!selectedPostId && (
            <div className="bg-white border border-[#3939391A] rounded-[24px] p-6 shadow-sm">
              <div className="flex gap-4 items-center mb-4">
                <IconMessageCustom className="text-[#A3A3A3]" />
                <input 
                  type="text" placeholder="Crear publicación..." className="w-full outline-none font-glacial"
                  value={postText} onChange={(e) => setPostText(e.target.value)}
                />
              </div>
              <button onClick={handleAddPost} className="px-6 py-1.5 rounded-full bg-[#F5F5F5] font-semibold text-[13px] hover:bg-gray-200 transition-colors">Publicar</button>
            </div>
          )}

          {displayedPosts.map((post) => (
            <article key={post.id} className="bg-white border border-[#3939391A] rounded-[24px] p-8 shadow-sm flex flex-col gap-4 relative">
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${post.isParentIn ? 'bg-[#D1D9F2]' : 'bg-gray-200'}`}>
                    <img src={post.isParentIn ? FlowerIcon : Avatar} className={post.isParentIn ? "w-6 h-6" : "w-full h-full object-cover rounded-full"} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] font-glacial">{post.author} <span className="font-normal text-[#A3A3A3] ml-1">{post.type}</span></h4>
                    <span className="text-[12px] text-[#C2C2C2] font-glacial">{post.time}</span>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={() => setActiveMenuId(activeMenuId === post.id ? null : post.id)} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
                    <IconDotsVertical className="text-[#C2C2C2]" />
                  </button>
                  {activeMenuId === post.id && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-1">
                      <button onClick={() => handleMuteUser(post.id)} className="w-full flex items-center gap-3 px-4 py-3 text-[14px] hover:bg-gray-50 text-left">
                        <IconMuteCustom /> <span>Silenciar usuario</span>
                      </button>
                      <button onClick={() => setActiveMenuId(null)} className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#FF5A5A] hover:bg-gray-50 text-left">
                        <IconReportCustom /> <span>Reportar</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {post.title && <h3 className="font-bold text-[22px] font-glacial leading-tight">{post.title}</h3>}
              
              <div className="flex flex-col gap-3">
                {post.isParentIn && expandedPostId === post.id && post.subtitulo && (
                  <p className="font-bold text-[16px] text-[#8B96A8] font-glacial italic">{post.subtitulo}</p>
                )}

                {Array.isArray(post.content) ? (
                  expandedPostId === post.id ? (
                    post.content.map((p, i) => <p key={i} className="text-[15px] font-glacial text-[#393939] leading-relaxed">{p}</p>)
                  ) : (
                    <p className="text-[15px] font-glacial text-[#393939] leading-relaxed line-clamp-2">{post.content[0]}</p>
                  )
                ) : (
                  <p className="text-[15px] font-glacial text-[#393939] leading-relaxed">{post.content}</p>
                )}
              </div>

              <div className="flex justify-between items-center gap-6 mt-4 border-[#F7F6F1] border-t pt-4">
                <div>
                  {selectedPostId ? (
                    <button onClick={handleBack} className="flex items-center gap-2 text-[#C2C2C2] font-glacial text-[15px] hover:text-[#393939] transition-colors">
                      <IconArrowBack /> Volver
                    </button>
                  ) : (
                    <button onClick={() => handleViewComments(post.id)} className="text-[#C2C2C2] font-glacial text-[14px] hover:text-[#393939] transition-colors">
                      Ver comentarios ({post.comments.length})
                    </button>
                  )}
                </div>
                {post.isParentIn && (
                  <button onClick={() => toggleExpand(post.id)} className="font-bold font-glacial text-[15px] text-[#C2C2C2] hover:underline transition-all">
                    {expandedPostId === post.id ? "Leer menos ↑" : "Leer artículo →"}
                  </button>
                )}
              </div>

              {!selectedPostId && (
                <div className="flex gap-8 mt-2 border-[#F7F6F1] border-t pt-4">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 font-glacial text-[15px] font-semibold transition-colors ${post.liked ? 'text-[#E6C0D7]' : 'text-[#A3A3A3]'}`}>
                    <IconHeart filled={post.liked} /> Me gusta
                  </button>
                  <button onClick={() => handleCommentClick(post.id)} className="flex items-center gap-2 text-[#A3A3A3] font-glacial text-[15px] font-semibold hover:text-[#393939]">
                    <IconMessageCustom /> Comentar
                  </button>
                </div>
              )}

              {selectedPostId === post.id && (
                <div className="mt-6 flex flex-col gap-4 border-[#F7F6F1] border-t pt-6">
                  <h5 className="font-bold text-[16px] font-glacial">Comentarios</h5>
                  <div className="flex flex-col gap-5">
                    {post.comments.map(c => (
                      <div key={c.id} className="flex flex-col gap-2">
                        <div className="flex gap-3 bg-gray-50 p-4 rounded-2xl">
                          <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                          <div className="flex-1">
                            <p className="font-bold text-[13px] font-glacial">{c.user}</p>
                            <p className="text-[14px] font-glacial text-[#393939]">{c.text}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <button onClick={() => toggleCommentLike(post.id, c.id)} className={`flex items-center gap-1.5 text-[12px] font-bold font-glacial transition-colors ${c.liked ? 'text-[#E6C0D7]' : 'text-[#A3A3A3]'}`}>
                            <IconHeart className="w-3.5 h-3.5" filled={c.liked} /> Me gusta
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {showCommentInput && (
                    <div className="flex gap-2 mt-4">
                      <input type="text" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)} placeholder="Escribe un comentario..." className="flex-1 bg-gray-100 rounded-full px-6 py-3 outline-none font-glacial text-[14px]" />
                      <button onClick={() => handleAddComment(post.id)} className="px-6 py-3 font-bold font-glacial text-[14px] text-[#E6C0D7] hover:opacity-80">Enviar</button>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
        
        <aside className="w-full lg:w-[300px] flex flex-col gap-6">
          <div className="bg-white border border-[#3939391A] rounded-[24px] p-6 shadow-sm sticky top-6">
            <h3 className="font-bold font-glacial text-[16px] mb-6">Canales de comunicación</h3>
            <div className="flex flex-col gap-5">
              
              {/* WhatsApp Link */}
              <a 
                href="https://chat.whatsapp.com/GfP6Fb3ws154yPZVtKe9AG?mode=gi_t" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex gap-3 items-center">
                  <CommunityAvatar badge={<IconBrandWhatsapp className="text-[#25D366]" />} />
                  <div>
                    <h5 className="font-bold text-[15px] font-glacial group-hover:text-green-600 transition-colors">WhatsApp</h5>
                    <p className="text-[13px] text-[#C2C2C2] font-glacial">Argentina</p>
                  </div>
                </div>
                <IconInfoCircle className="text-[#393939]" />
              </a>

              {/* Instagram Link */}
              <a 
                href="https://www.instagram.com/helloparentin?igsh=MXJ0OTEwMGRjeGkybA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex gap-3 items-center">
                  <CommunityAvatar badge={<IconInstagram className="text-[#E1306C]" />} />
                  <div>
                    <h5 className="font-bold text-[15px] font-glacial group-hover:text-pink-600 transition-colors">Instagram</h5>
                    <p className="text-[13px] text-[#C2C2C2] font-glacial">Latam</p>
                  </div>
                </div>
                <IconInfoCircle className="text-[#393939]" />
              </a>

            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}