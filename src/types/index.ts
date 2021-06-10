interface Author {
  name: string;
  profileLink: string;
  avatarSrc: string;
}

export interface Photo {
  id: string;
  src: string;
  unsplashLink: string;
  author: Author;
}
