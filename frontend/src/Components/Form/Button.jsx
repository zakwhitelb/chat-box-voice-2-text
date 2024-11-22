export default function Button({ file, convertFile }) {
    return (
        <div className="flex items-center w-[350px] h-[80px] rounded-[25px] cursor-pointer elementColor" onClick={() => convertFile(file)}>
            <p className="w-full text-center text-[28px] font-semibold whiteText">Envoyer ma question</p>
        </div>
    );
}
