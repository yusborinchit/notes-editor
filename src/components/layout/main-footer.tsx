export default function MainFooter() {
  return (
    <footer className="mx-auto mt-12 flex w-full max-w-screen-md flex-col items-center justify-between gap-2 px-8 py-4 sm:flex-row">
      <a href="https://github.com/yusborinchit/notes-editor" target="_blank">
        <span className="font-bold text-primary">yusborinchit/</span>
        <span>notes-editor</span>
      </a>
      <span className="text-muted-foreground">
        Copyright © 2024. All rights reserved.
      </span>
    </footer>
  );
}
