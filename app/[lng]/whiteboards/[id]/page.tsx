"use client";
import React, { useEffect, useRef } from "react";
import { Tools } from "../../../enums/tools";
import ZoomBar from "../../../components/zoomBar";
import ToolbarBase from "@/app/components/toolbar";
import { useTranslation } from "@/app/i18n/client";
import dynamic from "next/dynamic";
import DrawingCursor from "@/app/components/drawingCursor";
import { getBoardByIdAction, updateBoardAction } from "@/app/_action";
import { BoardClass } from "@/app/models/board";
import { useRouter } from "next/navigation";

const Canvas = dynamic(() => import("../../../components/wrappedCanvas"), {
  ssr: false,
});

export default function Whiteboard({ params: { lng, id } }: { params: any }) {
  const [selectedTool, setSelectedTool] = React.useState(Tools.Pencil);
  const [forms, setForms] = React.useState<any[]>();
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);

  const [board, setBoard] = React.useState<BoardClass>();
  const [zoom, setZoom] = React.useState(1.0);
  const [currentColor, setCurrentColor] = React.useState("#000000");
  const [drawSize, setDrawSize] = React.useState(3);

  const [isEdited, setIsEdited] = React.useState(false);

  const drawingZoneRef = useRef<any>(null);

  const { t } = useTranslation(lng, "common");
  const router = useRouter();

  useEffect(() => {
    // Function to handle board initialization and other logic
    async function initializeBoard(): Promise<void> {
      getBoardByIdAction({ ownerId: "", id: id, path: "/" }).then((data) => {
        console.log(data);
        if (data.board && !data.error) {
          const sanitizedBoard = {
            ...data.board,
          };

          setBoard(sanitizedBoard);
          setForms(data.board.drawings);
          setHistoryIndex(data.board.drawings.length);
        } else {
          router.push("/");
        }
      });
    }
    async function saveBoard(): Promise<void> {
      if (!board) return;

      const uri = drawingZoneRef.current.getCanvasURL();

      const updatedBoard = board;
      updatedBoard.drawings = forms!;

      setBoard(updatedBoard);
      await updateBoardAction(
        updatedBoard._id.toString(),
        updatedBoard,
        uri,
        "/"
      );
      setIsEdited(false);
    }

    if (board == null) initializeBoard();

    if (isEdited) saveBoard();
  }, [isEdited]);

  const updateScale = (newScale: number) => {
    if (drawingZoneRef.current) {
      drawingZoneRef.current.updateScale(newScale);
    }
  };

  if (forms)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <DrawingCursor tool={selectedTool} color={currentColor}></DrawingCursor>
        <Canvas
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          drawSize={drawSize}
          currentColor={currentColor}
          canvasRef={drawingZoneRef}
          setZoom={setZoom}
          forms={forms}
          setForms={setForms}
          selectedTool={selectedTool}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        ></Canvas>
        <ToolbarBase
          maxHistory={forms?.length}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          drawSize={drawSize}
          setDrawSize={setDrawSize}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          t={t}
        ></ToolbarBase>
        <ZoomBar
          zoom={zoom}
          updateScale={updateScale}
          t={t}
          lng={lng}
        ></ZoomBar>
      </main>
    );
  else "<h1>LOADING...</h1>";
}
