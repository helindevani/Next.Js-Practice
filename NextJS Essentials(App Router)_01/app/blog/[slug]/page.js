
export default function BlogPostPage({params}){
    return (
        <main>
            <h2>Blog Post Page</h2>
           <p>{params.slug}</p>
        </main>
    );
}