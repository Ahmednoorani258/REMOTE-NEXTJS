import getData from '@/app/helpers/service'

interface Book {
  id:number,
  name:string,
  type:string,
  availible:boolean,
}
export default async function BooksAPi() {
  
  const data = await getData<Book[]>('https://simple-books-api.glitch.me/books')

  console.log('Books' , data)
  return (
    <div>
      <ol>
        {data.map((obj,i) => {
          return(
            <li>{obj.name}</li>
          )
        })}
      </ol>
    </div>
  );
}
