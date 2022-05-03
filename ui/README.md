install metamask lib
```bash
npm i @metamask/detect-provider
```

install ethers sdk
```bash
npm i --save ethers
```

put metamask interface definition in `react-app-env.d.ts`
```typescript
interface Window {
    ethereum: any
}
```