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
                    <Card className='w-[350px] min-w-[200px] h-[300px]'>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex items-center justify-start">
                                    {playlist.imageUrl && <img src={playlist.imageUrl} className="w-8 h-8 rounded-sm" />}
                                    <div className='pl-2'>
                                        {playlist.playlistName}
                                    </div>
                                </div>

                            </CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col items-start justify-start w-[300px]'>
                            <ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
                                <div className="p-2">
                                    {playlist.tracks.map((track, index) => (
                                        <>
                                            <div key={`${track.name}-${index}`}>
                                                <div className='flex flex-row items-start justify-start'>
                                                    {track.imageUrl && <img src={track.imageUrl} className="w-6 h-6 rounded-sm" />}
                                                    <div className="text-sm pl-2">
                                                        {track.name}
                                                    </div>
                                                </div>
                                                <Separator className="my-2" />
                                            </div>
                                        </>
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