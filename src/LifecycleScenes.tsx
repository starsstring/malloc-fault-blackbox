import React from "react";
import { interpolate } from "remotion";
import {
  C,
  Code,
  Kicker,
  MovingPixels,
  Note,
  Pixels,
  Pill,
  SceneTiming,
  Text,
  Title,
  Arrow,
  pos,
  smooth,
  sans,
  mono,
  heart,
} from "./visual-kit";

export const ResizeScene: React.FC<SceneTiming> = ({ frame, fps, at }) => (
  <>
    <Kicker>07 / REALLOC · FOLLOW THE PIXELS</Kicker>
    <Title>长大，可能要搬家。</Title>
    <Text x={180} y={358} size={38} color={C.soft}>
      原对象 · 32 B
    </Text>
    <Text x={1240} y={358} size={38} color={C.soft}>
      新对象 · 64 B
    </Text>
    <Pixels
      x={175}
      y={434}
      count={8}
      size={69}
      mode="unknown"
      opacity={frame >= at("invalid") ? 0.28 : 1}
    />
    <Pixels
      x={1235}
      y={434}
      count={16}
      size={69}
      mode="unknown"
      from={at("request")}
    />
    <MovingPixels
      x1={175}
      x2={1235}
      y={434}
      start={at("move")}
      end={Math.min(at("copy") + 0.25 * fps, at("success") - 0.35 * fps)}
    />
    {frame >= at("tail") &&
      Array.from({ length: 8 }, (_, n) => {
        const i = n + 8;
        const painted = frame >= at("write") + n * 0.1 * fps;
        return (
          <div
            key={i}
            style={{
              ...pos(1235 + (i % 4) * 79, 434 + Math.floor(i / 4) * 79),
              width: 69,
              height: 69,
              borderRadius: 8,
              background: painted ? (heart[i] ? C.rust : "#e2d8c8") : "#dfe5dc",
              fontFamily: mono,
              fontSize: 30,
              color: C.soft,
              display: "grid",
              placeItems: "center",
            }}
          >
            {painted ? "" : "?"}
          </div>
        );
      })}
    <Arrow
      x1={600}
      y1={509}
      x2={1125}
      y2={509}
      progress={interpolate(
        frame,
        [at("move"), at("move") + 0.6 * fps],
        [0, 1],
        smooth,
      )}
    />
    {frame < at("inPlace") ? (
      <Pill x={650} y={565} size={35}>
        请求 64 B
      </Pill>
    ) : frame < at("move") ? (
      <Pill x={610} y={565} size={35}>
        也可能原地完成
      </Pill>
    ) : (
      <Pill x={610} y={565} size={35}>
        这里展示搬迁分支
      </Pill>
    )}
    {frame >= at("invalid") ? (
      <Pill x={174} y={644} color={C.soft} size={34}>
        旧对象失效
      </Pill>
    ) : (
      <Text x={177} y={644} size={35} color={C.rust}>
        p → 0x1000
      </Text>
    )}
    {frame >= at("success") && (
      <Text x={1234} y={773} size={34} color={C.rust}>
        {frame < at("pointer") ? "tmp → 0x2000" : "p → 0x2000"}
      </Text>
    )}
    {frame >= at("tail") && (
      <Text x={610} y={695} size={36} color={C.soft}>
        新增部分：先写入，再读取
      </Text>
    )}
    <Note>
      成功后用返回的新指针。示意地址发生变化；realloc 也可能原地完成。
    </Note>
  </>
);

export const FailureScene: React.FC<SceneTiming> = ({ frame, at }) => (
  <>
    <Kicker>08 / ANOTHER BRANCH · ALLOCATION FAILED</Kicker>
    <Title size={99}>
      扩容失败，
      <br />
      原画还在。
    </Title>
    <Code
      y={520}
      width={1080}
      size={37}
      active={
        frame < at("temporary")
          ? 2
          : frame < at("update")
            ? 0
            : frame < at("wrong")
              ? 1
              : 2
      }
      lines={[
        "tmp = realloc(p, next * sizeof *p);",
        "if (tmp != NULL) p = tmp;",
        "else { /* p 仍拥有原块 */ }",
      ]}
    />
    <Pixels x={1350} y={337} count={8} size={77} />
    <Text x={1338} y={553} size={38} color={C.mint}>
      p → 0x1000，仍有效
    </Text>
    {frame >= at("failed") && (
      <Pill x={1350} y={635} size={40}>
        tmp = NULL
      </Pill>
    )}
    {frame >= at("wrong") && (
      <Text x={135} y={755} size={33} color={C.rust}>
        错误写法：p = realloc(...)，可能丢掉原块的唯一引用
      </Text>
    )}
    <Note>
      这是从 8 格扩容出发的另一种结果。非零请求失败，原对象仍归程序所有。
    </Note>
  </>
);

export const ReleaseScene: React.FC<SceneTiming> = ({ frame, at }) => (
  <>
    <Kicker>09 / RETURN OWNERSHIP</Kicker>
    <Title>
      归还使用权，
      <br />
      保留责任边界。
    </Title>
    <Code
      y={570}
      width={890}
      size={43}
      active={frame < at("null") ? 0 : 1}
      lines={["free(p);", "p = NULL;"]}
    />
    <Pixels
      x={1305}
      y={330}
      count={16}
      size={70}
      opacity={frame >= at("free") ? 0.25 : 1}
    />
    {frame >= at("free") && (
      <Pill x={1260} y={461} size={50}>
        已释放 · 禁止读写
      </Pill>
    )}
    <Text x={1330} y={689} size={36} color={C.soft}>
      {frame >= at("null") ? "p = NULL" : "p → 这张小画"}
    </Text>
    {frame >= at("alias") && (
      <Pill x={1140} y={747} size={32}>
        别名 q 仍悬空，不能继续使用
      </Pill>
    )}
    {frame >= at("noClear") && (
      <Text x={138} y={740} size={39} color={C.mint}>
        内容看起来还在，也不再属于你。
      </Text>
    )}
    <Note>
      free 不承诺擦除内容或立即归还操作系统；置空 p 不能修复其他别名。
    </Note>
  </>
);

export const MistakesScene: React.FC<SceneTiming> = ({ frame, fps, at }) => {
  const active =
    frame < at("useAfterFree") ? 0 : frame < at("doubleFree") ? 1 : 2;
  const reviewing = frame >= at("question");
  return (
    <>
      <Kicker>10 / THREE DIFFERENT OWNERSHIP ERRORS</Kicker>
      <Title>问题常出在所有权。</Title>
      {[
        ["内存泄漏", "所有引用丢失", "p  ×  内存块"],
        ["释放后访问", "访问已失效的对象", "free → 仍访问"],
        ["重复释放", "同一块空间归还两次", "free → free ×"],
      ].map(([name, detail, diagram], i) => (
        <div
          key={name}
          data-visual-active={active === i && !reviewing}
          data-visual-label={name}
          style={{
            ...pos(130 + i * 570, 400),
            width: 530,
            height: 345,
            padding: "26px 24px",
            boxSizing: "border-box",
            borderRadius: 13,
            border: `2px solid ${active === i && !reviewing ? C.rust : "#c8d1c1"}`,
            background: active === i && !reviewing ? "#ebe8dd" : "transparent",
            opacity: reviewing ? 0.78 : active === i ? 1 : 0.42,
          }}
        >
          <div
            style={{
              fontFamily: sans,
              fontSize: 54,
              fontWeight: 600,
              color: active === i && !reviewing ? C.rust : C.ink,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: sans,
              fontSize: 32,
              color: C.soft,
              marginTop: 15,
            }}
          >
            {detail}
          </div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 38,
              color: C.ink,
              marginTop: 37,
              letterSpacing: -1,
            }}
          >
            {diagram}
          </div>
          <div style={{ display: "flex", gap: 9, marginTop: 31 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div
                key={n}
                style={{
                  width: 35,
                  height: 29,
                  borderRadius: 4,
                  background: i === 0 ? C.mint : C.rust,
                  opacity: i === 0 ? 1 : 0.35,
                  scale: interpolate(
                    frame,
                    [
                      at(["leak", "useAfterFree", "doubleFree"][i]),
                      at(["leak", "useAfterFree", "doubleFree"][i]) +
                        0.35 * fps,
                    ],
                    [0.92, 1],
                    { ...smooth, output: "perceptual-scale" },
                  ),
                }}
              />
            ))}
          </div>
        </div>
      ))}
      {reviewing && (
        <Text x={135} y={752} size={42} color={C.rust}>
          现在谁拥有它，最后由谁释放？
        </Text>
      )}
      <Note>
        三种错误按对应解说逐项突出。图解表达关系，不执行未定义行为程序。
      </Note>
    </>
  );
};
