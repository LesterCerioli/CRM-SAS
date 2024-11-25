import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';


const filePath = path.join(process.cwd(), 'data', 'posts.json');


interface Post {
    title: string;
    content: string;
    category: string;
}


async function createPost(data: Post): Promise<Post> {
    // Aqui você pode incluir a lógica para armazenar o post em um banco de dados, se necessário.
    return {
        title: data.title,
        content: data.content,
        category: data.category,
    };
}


async function addPostToJSON(post: Post): Promise<void> {
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([])); // Inicializa o arquivo se não existir
    }

    
    const currentPosts: Post[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    currentPosts.push(post); // Adiciona o novo post

    
    fs.writeFileSync(filePath, JSON.stringify(currentPosts, null, 2)); // Formata o JSON
}


export async function POST(request: Request): Promise<NextResponse> {
    try {
        const data: Post = await request.json();
        console.log('Data received for new post:', data);

        
        if (!data.title || !data.content || !data.category) {
            console.error('Validation error: Title, content, and category are required.');
            return NextResponse.json({ message: 'Title, content, and category are required.' }, { status: 400 });
        }

        
        const newPost: Post = await createPost(data);
        console.log('New post created:', newPost);

        
        await addPostToJSON(newPost);

        return NextResponse.json({ message: 'Post created successfully.', post: newPost }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ message: 'Error creating post.', error: (error as Error).message }, { status: 500 });
    }
}
