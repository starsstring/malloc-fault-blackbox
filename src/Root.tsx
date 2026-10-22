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
      durationInFrames={10100}
      width={1920}
      height={1080}
      fps={30}
    />
    <Folder name="Scenes">
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={506}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 16.866666666666667 }}
      />
      <Composition
        id="Background"
        component={Background}
        durationInFrames={885}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 29.5 }}
      />
      <Composition
        id="Contract"
        component={Contract}
        durationInFrames={724}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 24.133333333333333 }}
      />
      <Composition
        id="Inside"
        component={Inside}
        durationInFrames={791}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 26.366666666666667 }}
      />
      <Composition
        id="Virtual"
        component={Virtual}
        durationInFrames={632}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 21.066666666666666 }}
      />
      <Composition
        id="Allocate"
        component={Allocate}
        durationInFrames={691}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 23.033333333333335 }}
      />
      <Composition
        id="Initialize"
        component={Initialize}
        durationInFrames={584}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 19.466666666666665 }}
      />
      <Composition
        id="Resize"
        component={Resize}
        durationInFrames={683}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 22.766666666666666 }}
      />
      <Composition
        id="Failure"
        component={Failure}
        durationInFrames={704}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 23.466666666666665 }}
      />
      <Composition
        id="Release"
        component={Release}
        durationInFrames={729}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 24.3 }}
      />
      <Composition
        id="Mistakes"
        component={Mistakes}
        durationInFrames={636}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 21.2 }}
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
        durationInFrames={683}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 22.766666666666666 }}
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
        durationInFrames={544}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 18.133333333333333 }}
      />
    </Folder>
  </>
);
