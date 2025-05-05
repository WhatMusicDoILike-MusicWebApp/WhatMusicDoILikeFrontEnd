import { Playlist } from "../constants-types";
import { Card, CardContent, CardHeader, CardTitle, ScrollArea, Separator } from "../../ui";

interface PlaylistCardsProps {
    playlistData: Playlist[];
}

export const PlaylistCards = ({ playlistData }: PlaylistCardsProps): JSX.Element => {

    return (
        <div className='h-full w-full'>
            <div className='flex flex-row flex-wrap content-start gap-4 px-10 py-5 h-full w-full'>
                {playlistData && playlistData.map((playlist) => (
                    <Card className='w-full max-w-xs min-w-[200px] h-[300px]'>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex items-center justify-start">
                                    {playlist.playlistImageUrl && <img src={playlist.playlistImageUrl} className="w-8 h-8 rounded-sm" />}
                                    <div className='pl-2'>
                                        <a href={playlist.playlistUrl} target="_blank" rel="noopener noreferrer">
                                            {playlist.playlistName}
                                        </a>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col items-start justify-start w-full'>
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                <div className="p-2">
                                    {playlist.tracks.map((track, index) => (
                                        <div key={`${track.name}-${index}`}>
                                            <div className='flex flex-row items-start justify-start'>
                                                {track.imageUrl && <img src={track.imageUrl} className="w-6 h-6 rounded-sm" />}
                                                <div className="text-sm pl-2">
                                                    <a href={track.url} target="_blank" rel="noopener noreferrer">
                                                        {track.name}
                                                    </a>
                                                </div>
                                            </div>
                                            <Separator className="my-2" />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}