import { Hero } from "@/components/sections/hero";
import { Audiences } from "@/components/sections/audiences";
import { ListeningFit } from "@/components/sections/listening-fit";
import { AudiobookCollection } from "@/components/sections/audiobook-collection";
import { Genres } from "@/components/sections/genres";
import { Services } from "@/components/sections/services";
import { StoriesVoices } from "@/components/sections/stories-voices";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AudiobookCollection />
      <Audiences />
      <ListeningFit />
      <Genres />
      <StoriesVoices />
      <Services />
      <Newsletter />
    </>
  );
}
