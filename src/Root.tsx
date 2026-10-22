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
      durationInFrames={9299}
      width={1920}
      height={1080}
      fps={30}
    />
    <Folder name="Scenes">
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={444}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 14.8 }}
      />
      <Composition
        id="Background"
        component={Background}
        durationInFrames={775}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 25.833333333333332 }}
      />
      <Composition
        id="Contract"
        component={Contract}
        durationInFrames={611}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 20.366666666666667 }}
      />
      <Composition
        id="Inside"
        component={Inside}
        durationInFrames={784}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 26.133333333333333 }}
      />
      <Composition
        id="Virtual"
        component={Virtual}
        durationInFrames={694}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 23.133333333333333 }}
      />
      <Composition
        id="Allocate"
        component={Allocate}
        durationInFrames={613}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 20.433333333333334 }}
      />
      <Composition
        id="Initialize"
        component={Initialize}
        durationInFrames={493}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 16.433333333333334 }}
      />
      <Composition
        id="Resize"
        component={Resize}
        durationInFrames={587}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 19.566666666666666 }}
      />
      <Composition
        id="Failure"
        component={Failure}
        durationInFrames={627}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 20.9 }}
      />
      <Composition
        id="Release"
        component={Release}
        durationInFrames={831}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 27.7 }}
      />
      <Composition
        id="Mistakes"
        component={Mistakes}
        durationInFrames={587}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 19.566666666666666 }}
      />
      <Composition
        id="Fragment"
        component={Fragment}
        durationInFrames={662}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 22.066666666666666 }}
      />
      <Composition
        id="Practice"
        component={Practice}
        durationInFrames={574}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 19.133333333333333 }}
      />
      <Composition
        id="Tradeoff"
        component={Tradeoff}
        durationInFrames={668}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 22.266666666666666 }}
      />
      <Composition
        id="Closing"
        component={Closing}
        durationInFrames={559}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ durationSeconds: 18.633333333333333 }}
      />
    </Folder>
  </>
);
