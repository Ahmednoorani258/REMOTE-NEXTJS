export default function Home() {
  return (
    <div>
      {process.env.TOKEN}
      <br />
      {process.env.KEY}
      <br />
      {process.env.SECRET}
    </div>
  )
}
