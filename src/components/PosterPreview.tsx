import type {FC} from "react";

interface PosterPreviewProps {
    posterPath: string;
    title: string;
}

export const PosterPreview:FC<PosterPreviewProps> = ({ posterPath, title }) => {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return (
        <img
            src={posterPath ? `${baseUrl}${posterPath}` : "/no-poster.png"}
            alt={title}
            className="w-full h-auto object-cover"
        />
    );
};
