import Image from "next/image"

export function EssayFooter() {
  return (
    <footer>
      <p className="mb-4 italic leading-relaxed">
        <strong>{"George W."}</strong>{" "}
        {
          "is a web developer by day and avid game collector by night. He considers himself an amateur blogger and isn't sure why he's writing in the third person."
        }
      </p>
      <div className="chat chat-start">
        <div className="avatar chat-image">
          <div className="w-10 rounded-full">
            <Image
              width={40}
              height={40}
              src="/uploads/pikachu-trophy.png"
              alt="profile picture"
            />
          </div>
        </div>
        <div className="chat-bubble">
          Thanks for reading! Have questions or want to fact check me? Feel free
          to email me at{" "}
          <a className="underline" href="mailto:contact@afew.games">
            contact@afew.games
          </a>
          . I check messages dailly.
        </div>
      </div>
    </footer>
  )
}
