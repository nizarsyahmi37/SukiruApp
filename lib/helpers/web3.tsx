export const shortenAddress = (address: string, pre: number, suf: number) => {
    const prefix = address.slice(0, pre)
    const suffix = address.slice(suf)
    return `${prefix}...${suffix}`
}
