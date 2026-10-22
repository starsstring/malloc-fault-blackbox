import { Composition, Folder } from "remotion";
import { Movie } from "./Movie";
import {
  Opening,
  Background,
  Contract,
  Inside,
  Virtual,
  Allocate,
  Initialize,
  Resize,
  Failure,
  Release,
  Mistakes,
  Fragment,
  Practice,
  Tradeoff,
  Closing,
} from "./Scenes";
export const RemotionRoot = () => (
  <>
    <Composition
      id="MallocFilm"
      component={Movie}
      durationInFrames={9813}
      width={1920}
      height={1080}
      fps={30}
    />
    <Folder name="Scenes">
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={273}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 9.1 }}
      />
      <Composition
        id="Background"
        component={Background}
        durationInFrames={1017}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 33.9 }}
      />
      <Composition
        id="Contract"
        component={Contract}
        durationInFrames={616}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 20.533333333333335 }}
      />
      <Composition
        id="Inside"
        component={Inside}
        durationInFrames={829}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 27.633333333333333 }}
      />
      <Composition
        id="Virtual"
        component={Virtual}
        durationInFrames={644}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 21.466666666666665 }}
      />
      <Composition
        id="Allocate"
        component={Allocate}
        durationInFrames={676}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 22.533333333333335 }}
      />
      <Composition
        id="Initialize"
        component={Initialize}
        durationInFrames={536}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 17.866666666666667 }}
      />
      <Composition
        id="Resize"
        component={Resize}
        durationInFrames={661}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 22.033333333333335 }}
      />
      <Composition
        id="Failure"
        component={Failure}
        durationInFrames={674}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 22.466666666666665 }}
      />
      <Composition
        id="Release"
        component={Release}
        durationInFrames={697}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 23.233333333333334 }}
      />
      <Composition
        id="Mistakes"
        component={Mistakes}
        durationInFrames={744}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 24.8 }}
      />
      <Composition
        id="Fragment"
        component={Fragment}
        durationInFrames={802}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 26.733333333333334 }}
      />
      <Composition
        id="Practice"
        component={Practice}
        durationInFrames={645}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 21.5 }}
      />
      <Composition
        id="Tradeoff"
        component={Tradeoff}
        durationInFrames={716}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 23.866666666666667 }}
      />
      <Composition
        id="Closing"
        component={Closing}
        durationInFrames={493}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 16.433333333333334 }}
      />
    </Folder>
  </>
);
