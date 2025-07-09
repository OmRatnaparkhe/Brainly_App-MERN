import { Button } from '../components/UI/button';
import '../App.css';
import { PlusIcon } from '../icons/plus';
import { ShareIcon } from '../icons/share';
import { CardComponent } from '../components/Card';
import { CreateContentModal } from '../components/UI/CreateContentModal';
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/UI/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { SidebarItems } from '../components/UI/SidebarItems';
import { TwitterIcon } from '../icons/twitterIcon';
import { YoutubeIcon } from '../icons/youtubeIcon';
import { TextIcon } from '../icons/textIcon';
import { Logout } from '../icons/LogOut';
import { useNavigate } from 'react-router-dom';


export type Content = {
  _id: string;
  type: 'twitter' | 'youtube' | 'document'|"";
  link: string;
  title: string;
  text: string;
};
export function Dashboard() {
  const [modal, setModal] = useState(false);
  const [selectedType, setSelectedType] = useState<'twitter' | 'youtube' | 'document' | 'All' | null>(null);
  const { contents, refresh } = useContent() as { contents: Content[]; refresh: () => void };
  const navigate = useNavigate();
  
  useEffect(() => {
    refresh();
  }, [modal]);

  const filteredContent = (selectedType
    ? contents.filter(content => content.type === selectedType)
    : contents
  ).filter(
    (content): content is Content & { type: "twitter" | "youtube" | "document" } =>
      content.type === 'twitter' || content.type === 'youtube' || content.type === 'document'
  );

  return (
    <div className='w-full h-screen flex bg-gray-100'>
      {/* Sidebar */}
      <div className='w-[20%] min-h-screen bg-white shadow-xl hidden md:flex flex justify-between'>
        <Sidebar selectedType={selectedType} onTypeSelect={setSelectedType} />
      </div>
     
      {/* Main Content */}
      <div className='w-full md:w-[80%] flex flex-col'>
        {/* Header Actions */}
        <div className='flex flex-col md:flex-row justify-center md:justify-end items-center p-6 gap-4'>
          <Button
            variant='secondary'
            size='md'
            text='Share Brain'
            
            onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true,
              }, {
                headers: {
                  Authorization: localStorage.getItem('token'),
                },
              });
              const shareurl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareurl);
            }}
            startIcon={<ShareIcon size='md' />}
          />
          <Button
            variant='primary'
            size='md'
            text='Add Content'
            
            onClick={() => setModal(true)}
            startIcon={<PlusIcon size='md' />}
          />
        </div>

        {/* Content Modal */}
        <CreateContentModal open={modal} onClose={() => setModal(false)} />

        {/* Content Grid */}
        <div className='p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30%] overflow-auto'>
          {filteredContent.length > 0 ? (
            filteredContent.map(content => (
              <CardComponent
                key={content._id}
                id={content._id}
                type={content.type}
                link={content.link}
                title={content.title}
                text={content.text}
              />
            ))
          ) : (
            <div className='text-center text-gray-500 text-lg col-span-full'>No content available. Click "Add Content" to get started.</div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className='flex md:hidden fixed bottom-0 w-full bg-white shadow-xl py-3 justify-around'>
          <SidebarItems Icons={<TwitterIcon />} />
          <SidebarItems Icons={<YoutubeIcon />} />
          <SidebarItems Icons={<TextIcon />} />
          <SidebarItems Icons={<Logout />} onClick={() => navigate('/signin')} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard