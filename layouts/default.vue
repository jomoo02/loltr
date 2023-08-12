<template>
    <div>
        <div class="border-b min-h-[4rem] xs:min-h-[5rem] px-2 xs:px-3 bg-white">
            <div class="mx-auto flex items-center min-h-[4rem] xs:min-h-[5rem] max-w-7xl px-1 md:px-10 lg:px-24 xl:px-10">
                <div class="text-4xl xs:text-5xl font-bold text-[#3f3f46]">
                    <NuxtLink to="/">
                        lol.tr
                    </NuxtLink>
                </div>
            </div>
        </div>
        <slot />
        <!-- footer -->
        <div class="h-20">

        </div>
    </div>
</template>
