<template>
    <div class="flex flex-col mt-1 mb-4 lg:mt-2.5 lg:mb-4">
        <MatchCardArenaDetailTeam
            placement="1st"
            :max-damage-dto="maxDamageDto"
            :participants="teamsPlacement.get(1).participants"
            :check-redo="checkRedo"
            :check-win="true"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="2nd"
            :max-damage-dto="maxDamageDto"
            :participants="teamsPlacement.get(2).participants"
            :check-redo="checkRedo"
            :check-win="true"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="3rd"
            :max-damage-dto="maxDamageDto"
            :participants="teamsPlacement.get(3).participants"
            :check-redo="checkRedo"
            :check-win="false"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="4th"
            :max-damage-dto="maxDamageDto"
            :participants="teamsPlacement.get(4).participants"
            :check-redo="checkRedo"
            :check-win="false"
            :puuid="puuid"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    teamsPlacement: {
        type: Map
    },
    maxDamageDto: {
        type: Object
    },
    gameResult: {
        type: String
    },
    puuid: {
        type: String
    }
});

const checkRedo = props.gameResult === '다시하기' ? true : false;


</script>

