import { Button } from '../components/UI/button'
import '../App.css'
import { PlusIcon } from '../icons/plus'
import { ShareIcon } from '../icons/share'
import { CardComponent } from '../components/Card'
import { CreateContentModal } from '../components/UI/CreateContentModal'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/UI/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'
export default function YoutubeLinks(){
    return (
        <div>
<div>
    <Sidebar/>
</div>
       </div>)
}